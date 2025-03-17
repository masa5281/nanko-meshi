const API_VERSION = "/api/v1";

// フロントエンドのルート
export const ROUTES = {
  AUTH: {
    SIGN_UP: "/sign_up",
    SIGN_IN: "/sign_in",
    PASSWORD_RESET: "/password_reset",
    PASSWORD_SENT: "/password_sent"
  },
  USERS: {
    ITEM: "/users/item"
  },
  FOODS: {
    CONVERSION: "/foods/conversion",
    REGISTER: "/foods/register",
  },
  CALORIE: {
    INPUT: "/calorie/input"
  }
};

// APIエンドポイント
export const API_ENDPOINTS = {
  USERS: {
    BASE: `${API_VERSION}/users`
  },
  FOODS: {
    BASE: `${API_VERSION}/foods`
  },
  CALORIE: {
    BASE: `${API_VERSION}/calories`
  }
}
