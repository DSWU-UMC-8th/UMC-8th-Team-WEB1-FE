export const postReview = async (body: any, image?: File) => {
  const formData = new FormData();
  formData.append(
    "body",
    new Blob([JSON.stringify(body)], { type: "application/json" })
  );
  if (image) formData.append("image", image);

  const response = await fetch("/api/review", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("등록 실패");
  }

  return response.json();
};
