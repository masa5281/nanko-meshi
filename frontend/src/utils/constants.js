const API_VERSION = "/api/v1";

// フロントエンドのルート
export const ROUTES = {
  AUTH: {
    SIGN_UP: "/sign_up",
    SIGN_IN: "/sign_in",
    PASSWORD_RESET: "/password_reset",
    PASSWORD_SENT: "/password_sent",
    WEIGHT: "/weight",
  },
  USERS: {
    ITEM: "/users/item",
    PROFILE: "/users/profile"
  },
  FOODS: {
    CONVERSION: "/foods/conversion",
    REGISTER: "/foods/register",
  },
  CALORIE: {
    INPUT: "/calorie/input",
  },
};

// APIエンドポイント
export const API_ENDPOINTS = {
  USERS: {
    BASE: `${API_VERSION}/users`,
  },
  FOODS: {
    BASE: `${API_VERSION}/foods`,
  },
  CALORIE: {
    BASE: `${API_VERSION}/calories`,
  },
  METS: {
    BASE: `${API_VERSION}/mets`,
  },
};

// バリデーションメッセージ
export const VALIDATE_MESSAGES = {
  AUTH: {
    EMAIL: {
      required: "メールアドレスを入力してください",
      pattern: {
        value: /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: "有効なメールアドレスを入力してください"
      }
    },
    PASSWORD: {
      required: "パスワードを入力してください",
      minLength: { value: 6, message: "パスワードは6文字以上で入力してください" }
    },
  },
  USER: {
    NAME: {
      required: "ユーザー名を入力してください",
      maxLength: { value: 20, message: "ユーザー名は20文字以内で入力してください" }
    },
    WEIGHT: {
      required: "体重を選択してください"
    },
  },
  FOOD: {
    NAME: {
      required: "食品名を入力してください",
      maxLength: { value: 20, message: "食品名は20文字以内で入力してください" }
    },
    CALORIE: {
      required: "カロリーを入力してください",
      min: { value: 1, message: "カロリーは1以上で入力してください" },
      max: { value: 9999, message: "カロリーは9999以下で入力してください" }
    }
  },
  CALORIE: {
    BURNED_CALORIE: {
      required: "カロリーを入力してください",
      min: { value: 1, message: "カロリーは1以上で入力してください" },
      validate: {
        firstZero: (value) =>
          /^0/.test(value) ? "先頭に0を入力しないでください" : null,
        checkCalorieNum: (value) =>
          /^[0-9]+$/.test(value) || "カロリーは数字で入力してください",
      }
    },
  },
  METS: {
    ACTIVITY_TYPE: {
      required: "運動項目を選択してください"
    },
    ACTIVITY_TIME: {
      required: "運動時間を入力してください",
      min: { value: 1, message: "運動時間は1分以上で入力してください" },
      validate: {
        firstZero: (value) =>
          /^0/.test(value) ? "先頭に0を入力しないでください" : null,
        checkActivityTime: (value) =>
          /^[0-9]+$/.test(value) || "運動時間は数字で入力してください"
      }
    },
  }
};
