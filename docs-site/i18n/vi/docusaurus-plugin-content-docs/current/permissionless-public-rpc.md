---
title: RPC công khai không được phép
description: Thiết kế được đề xuất cho dịch vụ RPC Bitsocial công khai với người dùng bị cô lập, quyền có phạm vi và quyền sở hữu cộng đồng.
---

# RPC công khai không được phép

Đề xuất RPC công khai ban đầu tồn tại dưới dạng vấn đề GitHub được viết bằng thuật ngữ plebbit cũ. Trang này viết lại ý tưởng đó bằng ngôn ngữ Bitsocial và đóng khung nó như một đề xuất cấp sản phẩm thay vì một bức tường chi tiết triển khai.

## Mục tiêu ngôn ngữ đơn giản

Bitsocial Forge có thể chạy dịch vụ RPC công cộng cho phép nhiều người dùng quản lý cộng đồng Bitsocial của riêng họ từ xa mà không cần biến nhà điều hành thành người giám sát các cộng đồng đó.

Dịch vụ này sẽ giúp các ứng dụng khách di động và nhẹ trở nên thiết thực trong khi vẫn duy trì được ba ràng buộc:

1. Theo mặc định, người dùng luôn tách biệt với nhau.
2. Các quyền luôn rõ ràng và chi tiết.
3. Khả năng tương thích với hình dạng phản hồi và yêu cầu RPC hiện tại có thể được giữ nguyên trong quá trình triển khai.

## Vấn đề mà nó giải quyết được

Ngày nay, mô hình RPC đơn giản nhất thường là tất cả hoặc không có gì: một khóa xác thực, một miền quyền hạn, toàn quyền truy cập. Tính năng này phù hợp với một nhà điều hành nhưng không phù hợp với dịch vụ công cộng nhiều người dùng.

RPC công cộng không được phép cần một mô hình mạnh mẽ hơn:

- một dịch vụ có thể lưu trữ nhiều người dùng
- mỗi người dùng có cộng đồng và giới hạn riêng
- các chính sách do nhà điều hành xác định có thể ngăn chặn lạm dụng
- người dùng vẫn có thể chuyển đi hoặc tự lưu trữ sau

## Mô hình cốt lõi

### Người dùng

Mỗi người dùng nhận được thông tin xác thực cùng với gói quyền.

### Cộng đồng

Cộng đồng được tạo thông qua dịch vụ sẽ được gán cho bản ghi chủ sở hữu. Quyền sở hữu được theo dõi rõ ràng để có thể áp dụng các phương pháp quản lý cho đúng người dùng.

### Quyền

Quyền được dựa trên khả năng. Thay vì một boolean cho “có thể sử dụng RPC”, máy chủ có thể kiểm soát:

- người dùng có thể tạo bao nhiêu cộng đồng
- phương pháp quản lý nào khả dụng
- hoạt động xuất bản nào được phép
- giới hạn tỷ lệ nào được áp dụng
- bề mặt quản trị viên nào được hiển thị

### Bề mặt quản trị

Bản thân RPC công khai phải tập trung vào hành vi RPC hướng tới người dùng. Các tác vụ quản trị như tạo người dùng, chuyển quyền sở hữu và đánh giá kiểm tra thuộc về một bảng thông tin và API nhà điều hành riêng biệt.

## Quan điểm tương thích

Tài liệu hướng tới người dùng nên sử dụng các thuật ngữ Bitsocial như **cộng đồng** và **hồ sơ**.

Ở cấp độ dây, lần triển khai đầu tiên vẫn có thể duy trì hình dạng tải trọng và truyền tải JSON-RPC hiện tại khi điều này hữu ích cho khả năng tương thích. Nói cách khác: các tài liệu không còn cần phải nói như các tài liệu plebbit cũ nữa, ngay cả khi giai đoạn chuyển tiếp giữ lại một số tên phương thức cũ hoặc hình dạng yêu cầu ở hậu trường.

## Gói quyền được đề xuất

```ts
type PermissionBundle = {
  maxCommunities: number; // 0 = unlimited
  methods: {
    createCommunity: boolean;
    startCommunity: boolean;
    stopCommunity: boolean;
    editCommunity: boolean;
    deleteCommunity: boolean;
    publishComment: boolean;
    publishVote: boolean;
    publishCommentEdit: boolean;
    publishCommentModeration: boolean;
    publishCommunityEdit: boolean;
    getComment: boolean;
    getCommentPage: boolean;
    getCommunityPage: boolean;
    fetchContent: boolean;
    resolveAuthorAddress: boolean;
    commentUpdateSubscribe: boolean;
    communityUpdateSubscribe: boolean;
    communityListSubscribe: boolean;
    settingsSubscribe: boolean;
  };
  rateLimits: {
    requestsPerMinute: number;
    publishesPerHour: number;
  };
  storage: {
    maxTotalSize: number;
  };
  scope: {
    canPublishExternal: boolean;
    canReadExternal: boolean;
  };
  admin: {
    canTransferOwnership: boolean;
    canManageUsers: boolean;
    canViewAuditLogs: boolean;
    canViewAllCommunities: boolean;
  };
};
```

Tên phương thức chính xác mang tính minh họa. Phần quan trọng là hình thức của chính sách: các khả năng riêng lẻ được kiểm soát độc lập thay vì được gộp thành một mã thông báo siêu người dùng.

## Luồng kết nối

```text
client connects with auth credential
-> server validates the credential
-> server loads the user's permission bundle
-> server returns a permissions notification
-> client proceeds with the subset of actions it is allowed to use
```

Nhận thức về quyền vẫn là tùy chọn. Máy khách bỏ qua thông báo vẫn có thể hoạt động chính xác bằng cách xử lý các lỗi ủy quyền tiêu chuẩn từ máy chủ.

## Thực thi quyền sở hữu

Khi dịch vụ tạo một cộng đồng, nó sẽ tự động gán quyền sở hữu cho người dùng đang gọi. Từ đó:

- các hành động bắt đầu, dừng, chỉnh sửa và xóa cộng đồng là danh sách
- trong phạm vi chủ sở hữu và phản hồi đăng ký được mặc định cho cộng đồng của chính người gọi
- khả năng hiển thị rộng hơn là quyền quản trị viên rõ ràng chứ không phải mặc định

Một trường hợp đặc biệt quan trọng: nếu người dùng đăng ký vào một cộng đồng mà họ **không** sở hữu, thì máy chủ chỉ phải hiển thị trạng thái công khai mà bất kỳ người quan sát bên ngoài nào cũng sẽ thấy. Cấu hình chỉ dành cho chủ sở hữu hoặc dữ liệu thời gian chạy nội bộ sẽ không bao giờ bị rò rỉ thông qua API đăng ký.

## Bề mặt toán tử được đề xuất

API quản trị viên có thể vẫn nhàm chán và rõ ràng:

- liệt kê người dùng
- kiểm tra một người dùng
- tạo hoặc cập nhật người dùng
- xóa người dùng
- chuyển quyền sở hữu cộng đồng
- kiểm tra nhật ký kiểm tra

Việc xác thực cho API của nhà điều hành này phải tách biệt hoàn toàn với quá trình xác thực RPC của người dùng cuối.

## Các giai đoạn triển khai

### Giai đoạn 1

- thiết lập cấu trúc dự án RPC công khai
- thêm hồ sơ người dùng và theo dõi quyền sở hữu
- phân nhánh hoặc mở rộng máy chủ RPC hiện tại

### Giai đoạn 2

- triển khai các gói quyền
- thực thi chúng ở lớp phương thức RPC
- trả lại siêu dữ liệu về quyền khi kết nối

### Giai đoạn 3

- thêm API toán tử
- thêm ghi nhật ký kiểm tra
- thêm xác thực quản trị viên

### Giai đoạn 4

- gửi trang tổng quan quản trị
- kiểm tra các biện pháp kiểm soát lạm dụng
- thắt chặt giới hạn tốc độ và hạn ngạch bộ nhớ

## Câu hỏi mở

### Spam thông tin xác thực xác thực

Nếu việc tạo xác thực không tốn kém thì các dịch vụ công có thể cần một lớp thử thách trước khi cấp thông tin xác thực. Một cách khả thi là sử dụng lại chính mô hình thách thức cộng đồng để việc cấp thông tin xác thực kế thừa triết lý chống lạm dụng giống như phần còn lại của mạng.

### Đặt tên kế thừa

Một số cách triển khai ban đầu vẫn có thể hiển thị các tên phương thức cũ trong nội bộ để đảm bảo tính tương thích. Điều đó phải được coi là chi tiết di chuyển chứ không phải là từ vựng công khai vĩnh viễn của tài liệu Bitsocial.

## Tóm tắt

Đề xuất này thực sự là về một điều: làm cho cơ sở hạ tầng RPC công cộng trở nên hữu ích mà không cần quản lý nó. Một RPC Bitsocial công khai tốt sẽ giống như một sự hỗ trợ tùy chọn cho các cộng đồng đang điều hành, chứ không giống như một nền tảng trung tâm mới đòi lại quyền sở hữu thông qua cửa sau.
