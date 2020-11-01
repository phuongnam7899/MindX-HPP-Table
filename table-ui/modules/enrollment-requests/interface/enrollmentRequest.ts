export type EnrollmentRequestStatues = 'WAITING' | 'APPROVED' | 'REJECTED';

export interface EnrollmentRequest {
  id: string;
  name: string;
  type: string;
  status: EnrollmentRequestStatues;
  createdAt: string;
}
