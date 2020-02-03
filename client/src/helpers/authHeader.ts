export function authHeader(token: string) {
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
