export type ImageFeatures = {
  type: string;
  maxResults: number;
};

export type ImageRequest = {
  image: {
    content: string;
  };
  features: ImageFeatures[];
};

export type RequestBody = {
  requests: ImageRequest[];
};

export type LabelAnnotation = {
  description: string;
  mid: string;
  score: number;
  topicality: number;
};

export type VisionApiResponse = {
  responses: {
    labelAnnotations: LabelAnnotation[];
  }[];
};

export interface ClosestCategoryResult {
  itemClosestName: string;
  itemCategoryId: string;
}
