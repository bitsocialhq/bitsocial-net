---
title: Trình phân giải BSO
description: Phân giải tên miền .bso thành khóa chung bằng cách sử dụng bản ghi ENS TXT, với bộ nhớ đệm tích hợp sẵn và hỗ trợ đa nền tảng.
sidebar_position: 1
---

# Trình phân giải BSO

Trình phân giải BSO dịch tên miền `.bso` thành khóa công khai tương ứng bằng cách đọc các bản ghi TXT Bitsocial được lưu trữ trên ENS. Nó cung cấp một ứng dụng viem dùng chung, bộ nhớ đệm liên tục và hoạt động trong cả môi trường Node.js và trình duyệt.

- **GitHub**: [bitsocialnet/bso-phân giải](https://github.com/bitsocialnet/bso-resolver)
- **Giấy phép**: chỉ GPL-2.0

## Cài đặt

```bash
npm install @bitsocial/bso-resolver
```

## Tạo Trình phân giải

Khởi tạo trình phân giải bằng cách chuyển một đối tượng cấu hình tới hàm tạo:

```js
const resolver = new BsoResolver({ key, provider, dataPath });
```

| Tham số | Bắt buộc | Mô tả |
| ---------- | -------- | --------------------------------------------------- |
| `key` | Có | Mã định danh cho phiên bản trình phân giải.               |
| `provider` | Có | Cấu hình vận chuyển (xem bên dưới).                |
| `dataPath` | Không | Thư mục dành cho tệp bộ nhớ đệm SQLite (chỉ dành cho Node.js). |

### Provider Options

The `provider` parameter accepts three formats:

- **`"viem"`** -- Sử dụng phương tiện công cộng mặc định do viem cung cấp.
- **HTTP(S) URL** -- Kết nối thông qua điểm cuối JSON-RPC (ví dụ: `https://mainnet.infura.io/v3/YOUR_KEY`).
- **WebSocket URL** -- Kết nối thông qua điểm cuối WebSocket RPC (ví dụ: `wss://mainnet.infura.io/ws/v3/YOUR_KEY`).

## Phương thức

### `resolve({ name, abortSignal? })`

Tra cứu tên `.bso` và trả về khóa chung liên quan. `AbortSignal` tùy chọn có thể được chuyển để hủy các yêu cầu dài hạn.

### `canResolve({ name })`

Trả về một boolean cho biết liệu trình phân giải có thể xử lý tên đã cho hay không. Sử dụng tính năng này để kiểm tra hỗ trợ trước khi thử giải pháp đầy đủ.

### `destroy()`

Xóa trình phân giải, đóng kết nối cơ sở dữ liệu và giải phóng tài nguyên. Gọi lệnh này khi không cần đến trình phân giải nữa.

## Bộ nhớ đệm

Các tên đã phân giải được lưu vào bộ nhớ đệm tự động để giảm việc tra cứu mạng dư thừa. Phần phụ trợ bộ nhớ đệm được chọn dựa trên môi trường thời gian chạy:

| Môi trường | Phần cuối | Ghi chú |
| ----------- | --------------- | ---------------------------------------------------------- |
| Node.js | SQLite | Được lưu trữ tại `dataPath`. Sử dụng chế độ WAL để truy cập đồng thời. |
| Trình duyệt | IndexedDB | Sử dụng các giao dịch IndexedDB gốc.                        |
| Dự phòng | `Map` trong bộ nhớ | Được sử dụng khi cả SQLite lẫn IndexedDB đều không có sẵn.       |

Tất cả các mục trong bộ nhớ đệm đều có **TTL một giờ** và tự động bị xóa sau khi hết hạn.

## Tích hợp với pkc-js

Trình phân giải có thể được cắm trực tiếp vào pkc-js thông qua tùy chọn `nameResolvers`, cho phép phân giải tên `.bso` trong suốt trong quá trình tra cứu khóa:

```js
const pkc = new Pkc({
  nameResolvers: [resolver],
  // ...other options
});
```

## Đồng thời

Trình phân giải được thiết kế để an toàn khi sử dụng đồng thời:

- Một máy khách viem dùng chung duy nhất tránh các kết nối dư thừa.
- SQLite hoạt động trong WAL Chế độ (Ghi nhật ký ghi trước), cho phép đọc đồng thời mà không bị chặn.
- Bộ nhớ đệm của trình duyệt dựa trên các giao dịch IndexedDB gốc để tách biệt.

## Điểm đầu vào nền tảng

Gói này cung cấp các điểm đầu vào riêng biệt cho các bản dựng trình duyệt và Node.js. Các gói hỗ trợ trường `exports` trong `package.json` sẽ tự động chọn đúng gói.
