export function mapSchUserStatus(status: string): string {
  if (status === '1') {
    return 'ใช้งาน';
  } else return 'ไม่ใช้งาน';
}