from pathlib import Path
import torch
import torch.nn as nn
import torchvision.transforms as T
from PIL import Image
import os
from django.conf import settings

# Label encodings
labelEncoder = {
    'volleyball': 0, 'basketball': 1, 'tennis_ball': 2, 'hockey_ball': 3,
    'rugby_ball': 4, 'baseball': 5, 'football': 6, 'cricket': 7,
    'shuttlecock': 8, 'golf': 9
}
reverseLabel = {v: k for k, v in labelEncoder.items()}

# Image transforms
testTransforms = T.Compose([
    T.Resize((128, 128)),
    T.ToTensor()
])

# Model definition
class BallClassifierModel(nn.Module):
    def __init__(self, input_size=3, output_size=len(labelEncoder)):
        super().__init__()
        self.ConvBLK1 = nn.Sequential(
            nn.Conv2d(input_size, 32, kernel_size=2, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=1)
        )
        self.ConvBLK2 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=2, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=1)
        )
        self.ConvBLK3 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=2, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=1)
        )
        self.classifier = nn.Sequential(
            nn.Linear(in_features=524288, out_features=32),
            nn.ReLU(),
            nn.Linear(in_features=32, out_features=16),
            nn.ReLU(),
            nn.Linear(in_features=16, out_features=output_size),
        )

    def forward(self, x):
        x = self.ConvBLK1(x)
        x = self.ConvBLK2(x)
        x = self.ConvBLK3(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

# Load model
model = BallClassifierModel()
modelPath = os.path.join(settings.BASE_DIR, 'predict', 'models', 'sample.pth')
model.load_state_dict(torch.load(modelPath, map_location=torch.device('cpu')))
model.eval()  # Set to evaluation mode

# Prediction function
def predictBallType(image):  # image: PIL.Image
    img = Image.open(image.file).convert('RGB')
    transformed = testTransforms(img).unsqueeze(0)
    with torch.no_grad():
        output = model(transformed)
        predicted_index = output.argmax(dim=1).item()
    predicted_label = reverseLabel[predicted_index]
    return f"{predicted_label.replace('_', ' ')}"

# Main entry point
if __name__ == "__main__":
    image_path = input("Enter the path to the image file: ").strip()
    
    if not os.path.exists(image_path):
        print("❌ Error: Image file not found!")
    else:
        try:
            image = Image.open(image_path)
            result = predictBallType(image)
            print(result)
        except Exception as e:
            print(f"⚠️ Failed to open or predict image: {e}")
