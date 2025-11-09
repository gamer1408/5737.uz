import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailPage from '@/components/ProductDetailPage';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <ProductDetailPage productId={id} />
  );
}
