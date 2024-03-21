export * from './expiresToken';
export * from './transform.interceptor';
export * from './loadFiles.interceptor';
export * from './helper';
export * from './firebase-service';
export function generateSlug(str) {
  return str
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
    .toLowerCase() // Chuyển đổi thành chữ thường
    .replace(/[^a-z0-9 -]/g, '') // Loại bỏ các ký tự đặc biệt, giữ lại dấu gạch ngang và khoảng trắng
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ các dấu gạch ngang trùng lặp
    .replace(/^-|-$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
}
