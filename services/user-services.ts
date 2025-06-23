import axiosInstance from "./api-services";

export const fetchUsers = async () => {
  try {
    // const response = await axiosInstance.get('/pages');
    // console.log('Supported pages list:', response.data);
    // return response.data;
    return [
      {
        user_name: "Alice Nguyen",
        email: "alice@example.com",
        phone: "0901234567",
        role: "Admin",
        create_date: "2024-06-01",
        status: "Active",
        action: "",
      },
      {
        user_name: "Bob Tran",
        email: "bob@example.com",
        phone: "0912345678",
        role: "Editor",
        create_date: "2024-05-15",
        status: "Inactive",
        action: "",
      },
      {
        user_name: "Charlie Le",
        email: "charlie@example.com",
        phone: "0923456789",
        role: "Viewer",
        create_date: "2024-04-20",
        status: "Active",
        action: "",
      },
      {
        user_name: "David Pham",
        email: "david.pham@example.com",
        phone: "0934567890",
        role: "Admin",
        create_date: "2024-03-10",
        status: "Active",
        action: "",
      },
      {
        user_name: "Emma Vo",
        email: "emma.vo@example.com",
        phone: "0945678901",
        role: "Editor",
        create_date: "2024-02-18",
        status: "Inactive",
        action: "",
      },
      {
        user_name: "Frank Huynh",
        email: "frank.huynh@example.com",
        phone: "0956789012",
        role: "Viewer",
        create_date: "2024-01-25",
        status: "Active",
        action: "",
      },
      {
        user_name: "Grace Bui",
        email: "grace.bui@example.com",
        phone: "0967890123",
        role: "Admin",
        create_date: "2023-12-30",
        status: "Active",
        action: "",
      },
      {
        user_name: "Henry Dang",
        email: "henry.dang@example.com",
        phone: "0978901234",
        role: "Editor",
        create_date: "2023-11-15",
        status: "Inactive",
        action: "",
      },
      {
        user_name: "Ivy Tran",
        email: "ivy.tran@example.com",
        phone: "0989012345",
        role: "Viewer",
        create_date: "2023-10-05",
        status: "Active",
        action: "",
      },
      {
        user_name: "Jackie Lam",
        email: "jackie.lam@example.com",
        phone: "0990123456",
        role: "Admin",
        create_date: "2023-09-12",
        status: "Active",
        action: "",
      }
    ];
  } catch (error) {
    console.error("Failed to fetch supported pages:", error);
    return [];
  }
};
