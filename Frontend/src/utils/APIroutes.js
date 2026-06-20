export const host = "https://hostelcare-bqt7.onrender.com";

//user routes
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const alladminRoute = `${host}/api/auth/alladmin`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;

// message routes
export const sendMessageRoute = `${host}/api/message/addmsg`;
export const recieveMessageRoute = `${host}/api/message/getmsg`;

//admin routes
export const adminLoginRoute = `${host}/api/admin/login`;
export const adminRegisterRoute = `${host}/api/admin/register`;

//complaint routes
export const createComplaintRoute = `${host}/api/complain/submit`;
export const allgetComplaintRoute = `${host}/api/complain/all`;
export const getComplaintsRoute = `${host}/api/complain`;
export const deleteComplaintRoute = `${host}/api/complain/delete`;
export const updateComplaintStatusRoute = `${host}/api/update/status`; // Added route for updating complaint status
