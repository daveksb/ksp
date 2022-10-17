export function mapSchUserStatus(status: string): string {
  if (status === '1') {
    return 'ใช้งาน';
  } else return 'ไม่ใช้งาน';
}

export function mapRequestType(requestType: string): string {
  if (requestType === '1') {
    return 'ขอยื่นผู้ประสานงาน';
  } else return 'ขอยื่นถอดถอนผู้ประสานงาน';
}
