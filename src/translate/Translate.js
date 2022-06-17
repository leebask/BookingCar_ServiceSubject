import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

const translationEn = {
    login: "Login",
    password: "Password",
    signup: "Signup",
    or: "Or",
    loginfb: "Login with Facebook",
    logingg: "Login with Google",
    cartour: "Cartour",
    nhaxe: "car owner",
    contact: "Contact",
    bookingonline:"Booking Online",

  
  }
  const translationVi = {
    login: "Đăng nhập",
    password: "Mật khẩu",
    signup: "Đăng kí",
    or: "Hoặc",
    loginfb: "Tiếp tục với Facebook",
    logingg: "Tiếp tục với Google",
    cartour: "Chuyến xe",
    nhaxe: "Nhà xe",
    contact: "Liên hệ",
    bookingonline: "Đặt xe online"

  
  }
  
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        En: { translation: translationEn },
        Vi: { translation: translationVi }
      },
      lng: "Vi",
      fallbackLng: "Vi",
      interpolation: { escapeValue: false },
    }
    )