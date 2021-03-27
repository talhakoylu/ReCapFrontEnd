export class GlobalConstants {
    public static apiUrl: string = "https://localhost:44327/api/";

    static Messages = class {
        public static loginError: string = "Kullanıcı adı veya şifre hatalı!";
        public static loginSuccess: string = "Başarıyla giriş yapıldı, geri yönlendiriliyorsunuz!";
        public static registerSuccess: string = "Tebrikler, kayıt işlemi başarılı! Ana sayfaya yönlendiriliyorsunuz.";
        public static logoutSuccess: string = "Hesabınızdan başarılı bir şekilde çıkış yaptınız.";

        public static welcomeMessage: string = "Hoş geldin";
    }
}