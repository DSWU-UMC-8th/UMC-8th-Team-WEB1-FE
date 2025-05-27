export interface Review {
  reviewId: number;
  rate: number;
  studyTime: string;
  likes: number;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
}


interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  message?: string;
}

// 최신 리뷰 리스트 조회 API 함수
export async function fetchLatestReviews(params: {
  category: string;
  level: string;
  studyTime: string;
  pageNumber: number;
}): Promise<Review[]> {
  const query = new URLSearchParams({
    category: params.category,
    level: params.level,
    studyTime: params.studyTime,
    pageNumber: params.pageNumber.toString(),
  }).toString();

  const response = await fetch(`/api/reviews/latest?${query}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(`Expected JSON but got: ${text}`);
  }

  const data: ApiResponse<Review[]> = await response.json();

  if (!data.isSuccess) {
    throw new Error(data.message || "리뷰 데이터를 불러오는 데 실패했습니다.");
  }

  return data.result;
}
