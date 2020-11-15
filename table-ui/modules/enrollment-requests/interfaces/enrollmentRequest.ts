export type EnrollmentRequestStatus = 'WAITING' | 'APPROVED' | 'REJECTED';

export interface EnrollmentRequest {
  id: string;
  name: string;
  type: string;
  status: EnrollmentRequestStatus;
  createdAt: string;
}
