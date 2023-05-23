export type Town = {
  id: string;
  title: string;
};

export type Work = {
  id: string;
  title: string;
};

export type Vacancy = {
  id: string;
  profession: string;
  favorite: boolean;
  payment_from: number;
  payment_to: number;
  town: Town;
  type_of_work: Work;
  currency: string;
  vacancyRichText: string;
  agreement?: boolean;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
};

export type SearchParams = {
  page: number;
  count: number;
  keyword?: string;
  payment_from?: string;
  payment_to?: string;
  catalogues?: number;
  published?: string;
};

export type VacanciesResponse = {
  objects: Vacancy[];
  total: number;
  currentPage: number;
  totalPages: number;
};

export type CataloguesResponse = {
  key: string;
  title_trimmed: string;
};

export type SelectOption = {
  key: string;
  label: string;
};
