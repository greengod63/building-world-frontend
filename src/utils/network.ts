const baseUrl = "http://127.0.0.1:5000/";

export const registerUrl = baseUrl + "api/verification/email/send";
export const VerifyRegUrl = baseUrl + "api/verification/email/verify";
export const fetchEmployeesUrl = (companyId: number, employeeId: number) => baseUrl + `api/hierarchy/employees/${companyId}/${employeeId}`;
export const fetchOwnersUrl = (companyId: number) => baseUrl + `api/hierarchy/owners/${companyId}`;
export const fetchLeadersUrl = (companyId: number, employeeId: number) => baseUrl + `api/hierarchy/leaders/${companyId}/${employeeId}`;
export const moveWorkerUrl = (comapnyId: number, moveWorkerId: number) => baseUrl + `api/hierarchy/moving/${comapnyId}/${moveWorkerId}`;
export const loginUrl = baseUrl + 'api/login';
export const searchWorkersUrl = baseUrl + 'api/search/workers';
export const whoAmIUrl = baseUrl + 'api/whoami';
export const navbarUrl = (userId: number) => baseUrl + `api/navbar/${userId}`;
export const updateStatusUrl = baseUrl + 'api/profile/updateStatus';
export const refreshUrl = baseUrl + 'api/refresh';
export const SearchWorkerUrl = baseUrl + "api/search/workers";
export const hireUrl = baseUrl + 'api/hierarchy/hire/invitation/send';
export const acceptJobOfferUrl = baseUrl + 'api/hierarchy/hire/invitation/confirm';
export const fetchTheLeaderUrl = (companyId: number, employeeId: number) => baseUrl + `api/hierarchy/aleader/${companyId}/${employeeId}`;
export const chatInfoById = (chatId: number) => baseUrl + `api/chats/get/chat/${chatId}`
export const sendChatMessageUrl = (chatId: string, chatMessage: string) => baseUrl + chatId // we do not have an endpoint for sending messages
export const fireEmployeeUrl = baseUrl + 'api/hierarchy/fire';
export const editProfileUrl = baseUrl + 'api/edit/profile'
export const getChatMessagesUrl = (chatId: number, page: number, perPage: number) => baseUrl + `api/chats/${chatId}/messages?page=${page}&per_page=${perPage}`;
export const getChatListUrl = (companyId: number) => baseUrl + `api/company/${companyId}/chats`;
export const getChatInfoUrl = (chatId: number) => baseUrl + `api/chats/${chatId}`;
export const readMessageUrl = (chatId: number) => baseUrl + `api/chats/${chatId}/read/messages`
