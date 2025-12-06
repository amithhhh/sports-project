'use client'

import React from "react";
import { useParams } from "next/navigation";
import ProductsDetails from "@/components/ProductsDetails";

export default function ProductPage() {
    const { id } = useParams();

    return (
        <div>
            <ProductsDetails productId={id} />
        </div>
    );
}
