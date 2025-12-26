# Backend Integration Guide

## Setup

1. Install dependencies:
```bash
npm install
```

## Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Using Dynamic Data

### In Server Components (Recommended)

```typescript
// src/app/uz/page.tsx
import HomePage from "@/app/components/HomePage";
import { homeApi } from "@/lib/axios";
import type { DynamicHomeData } from "@/types/dynamic";

export default async function Page() {
  let dynamicData: DynamicHomeData | undefined;
  
  try {
    dynamicData = await homeApi.getHomeData('uz');
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Continue without dynamic data
  }
  
  return <HomePage locale="uz" dynamicData={dynamicData} />;
}
```

### In Client Components

```typescript
"use client";

import { useEffect, useState } from "react";
import { homeApi } from "@/lib/axios";
import type { DynamicHomeData } from "@/types/dynamic";

export default function Page() {
  const [dynamicData, setDynamicData] = useState<DynamicHomeData>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    homeApi.getHomeData('uz')
      .then(data => {
        setDynamicData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return <HomePage locale="uz" dynamicData={dynamicData} />;
}
```

## Backend API Expected Format

### GET /api/home

**Headers:**
```
Accept-Language: uz | kr | ru
Content-Type: application/json
```

**Response:**
```json
{
  "stats": {
    "users": 1000,
    "projects": 50,
    "clients": 200
  },
  "news": [
    {
      "id": 1,
      "title": "News Title",
      "content": "News content...",
      "date": "2024-01-01",
      "image": "https://..."
    }
  ],
  "testimonials": [
    {
      "id": 1,
      "author": "John Doe",
      "position": "CEO",
      "text": "Great service!",
      "avatar": "https://..."
    }
  ],
  "team": [
    {
      "id": 1,
      "name": "Jane Doe",
      "role": "Developer",
      "bio": "Bio text...",
      "image": "https://..."
    }
  ]
}
```

## Current Structure

- **Static Content**: `src/content/` - All UI text in 3 languages
- **Dynamic Data**: `src/types/dynamic.ts` - Type definitions
- **API Client**: `src/lib/axios.ts` - Axios instance with locale support
- **Component**: `src/app/components/HomePage.tsx` - Main component

## Next Steps

1. Update `.env.local` with your backend URL
2. Modify page.tsx files to fetch dynamic data
3. Backend should return data based on `Accept-Language` header
4. Component will automatically display dynamic data when available

