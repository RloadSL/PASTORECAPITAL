import Link from 'next/link';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';
import { getAuthor, getFeaturedImage } from 'infrastructure/wordpress/wp.utils';

export default function Post({ post }:any) {
  

  return (
    <div>
      Post
    </div>
  );
}