export class GlobalConstants {
    public static apiUrl: string = "https://localhost:44327/api/";

    static Messages = class {
        public static loginError: string = "Kullanıcı adı veya şifre hatalı!";
        public static loginSuccess: string = "Başarıyla giriş yapıldı, ana sayfaya yönlendiriliyorsunuz!";
        public static registerSuccess: string = "Tebrikler, kayıt işlemi başarılı! Ana sayfaya yönlendiriliyorsunuz.";
    }
}