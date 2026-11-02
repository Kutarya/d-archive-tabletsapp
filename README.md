# BT Souvenirs — Android Tablet 1.1.0

Proje: `D:\TabletsApp`. Android Studio'da bu klasörü açın. Uygulama, düzeltilmiş `YunusEmre.html` dosyasının işlevlerini cihaz içinde çalıştırır; internet sunucusu kullanmaz. Özgün 60 müşteri, 9 ürün, 3 kategori, şirket bilgileri ve BT Souvenirs logosu korunmuştur. Arayüz kaynak uygulamadaki gibi İngilizcedir.

## Kurulum

Teslim edilen dosya **BT-Souvenirs-Tablet-1.1.0.apk**, kalıcı proje anahtarıyla imzalanmış release APK'dır. Android 8.0 / API 26 ve üstüne kurulabilir; güncel Android System WebView kullanılmalıdır. APK'yi tablete kopyalayıp açın, Android isterse dosyayı açtığınız uygulama için yükleme izni verin. Uygulama açıldıktan sonra çevrimdışı kullanılabilir.

İlk kurulumda 60 hazır müşteri ve 9 katalog ürünü gelir. Masaüstü tarayıcısında sonradan eklenen kayıtlar HTML dosyasının içinde değildir. Bu kayıtlar için masaüstündeki **Settings & backup → Export JSON backup** dosyasını tablete kopyalayıp uygulamada **Restore JSON backup** ile açın.

Güncellemeleri aynı release imzasıyla mevcut uygulamanın üzerine yükleyin. `signing/` altındaki anahtar ve parolalar bu bilgisayarda korunmalıdır. Önceki debug derlemeleri farklı imzalıdır; Android bunların üzerine release APK kurulmasına izin vermeyebilir. Böyle bir kurulumdaki kayıtları önce JSON olarak dışa aktarın. Kaynak ZIP gizli imzalama dosyalarını içermez.

## Günlük kullanım

1. **New issue slip** bölümünde müşteriyi arayıp seçin. Gerekiyorsa ayrı teslimat adresi ekleyin.
2. Ürünü ekleyin; miktar, birim fiyat ve KDV'yi girin. Fiyatlar boş başlar; ücretsiz ürün için açıkça `0` girin.
3. Diğer bilgilerde belge numarası, para birimi, elle girilen kur ve notları kontrol edin.
4. İncelemede **Save issue slip** ile kaydedin. **Save draft** ile daha sonra devam edebilirsiniz.

Tablet yatay/dikey düzenleri desteklenir. Dar ekranlarda ürünler ve kayıt listeleri etiketli kartlara dönüşür; yana kaydırmadan alanlara erişilir. Ekran dönüşünde ve uygulama yeniden açıldığında çalışma taslağı ve mevcut adım korunur.

## Müşteri defteri: içe ve dışa aktarım

**Customers → Export customer book**, tüm mevcut müşterileri; telefon, e-posta ve teslimat adresleriyle ayrı bir `bt-customers-YYYY-MM-DD.json` dosyasına yazar. Android dosya seçicisinden konum ve ad seçebilirsiniz. Yeni müşteri kaydettikten sonra tekrar dışa aktarırsanız yeni kayıtlar da dosyada bulunur.

**Import customer book**, bu dosyayı veya mPOHODA müşteri XML dosyasını açar. Müşteri JSON dosyası mevcut deftere birleştirilir; mevcut müşteriler ve belgeler silinmez. Eşleşen müşterilerin yerel kimlikleri korunur, yeni adresler birikir. Aynı dosyayı tekrar içe almak müşteri/adresleri çoğaltmaz. İçe alma öncesinde kayıt sayıları gösterilir ve yerel kurtarma kopyası tutulur.

Bu müşteri dosyası yalnızca müşteri defterini taşır. Bütün belgeler, ayarlar ve taslak için **Settings & backup → Export JSON backup** kullanın.

## Yazdırma, PDF ve WhatsApp paylaşımı

Belge önizlemesinde üç ayrı seçenek bulunur:

- **Print**: Android yazdırma ekranını açar. Tabletin sistem yazdırma hizmetinde görünen yazıcıyı seçin.
- **Save PDF**: Android yazdırma ekranında **Save as PDF** hedefini seçin; PDF düğmesine dokunun, konumu belirleyin ve **SAVE** deyin.
- **Share PDF**: PDF'yi otomatik oluşturup Android paylaşım menüsüne verir. WhatsApp, e-posta, Drive, Bluetooth veya kurulu başka bir hedef seçilebilir. Belge listesindeki **Share** düğmesi de bu işlemi doğrudan başlatır.

WhatsApp'ın tablette kurulu olması gerekir. Uygulama kişi veya sohbet seçmez, mesajı otomatik göndermez. Yazıcı bulunabilirliği Android yazdırma hizmetine ve yazıcının bağlantısına bağlıdır.

Yazdır/PDF kaydet Android'in belge adaptörünü kullanır. Hızlı paylaşım aynı A4 sayfaları 288 dpi PDF'ye işler; bu paylaşım PDF'sinde metin görüntü olarak tutulur. Çok sayfalı belgelerde satırlar korunur, genel toplam yalnızca son sayfada görünür.

## Veri saklama

`localStorage["olga_issue_slip_v4"]` biçimi korunur. Aynı kayıtların SHA-256 kontrollü güncel/önceki kopyaları Android özel dosya alanına atomik olarak yazılır. Bozuk ana verinin üzerine sessizce yazılmaz; kurtarma ve yedek dışa aktarma seçenekleri sunulur. Uygulamayı kaldırmak veya Android'den verilerini silmek özel kopyaları da siler; ayrı JSON dosyalarınızı saklayın.

Uygulama internet, kamera veya geniş depolama izni istemez. Dosyalar Android konum seçicisiyle açılır/kaydedilir. Paylaşım yalnızca oluşturulan PDF'ye geçici okuma izni verir; müşteri veritabanı paylaşım sağlayıcısından erişilemez.

## Derleme ve kaynak

JDK 17 hedefi, AGP 8.13.0, Gradle 8.14.3, Kotlin 2.2.10; compile/target SDK 36, min SDK 26. Proje mevcut kurulu sürümlerle doğrulanmıştır.

```powershell
$env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
.\scripts\build-release.ps1
```

Çıktı: `app/build/outputs/apk/release/app-release.apk`.

`original/YunusEmre.html` son onarılan kaynak dosyanın birebir kopyasıdır. `original/source-integrity.json` kaynak ve logo hash'lerini içerir. `python scripts/prepare_assets.py` kaynağı yeniden ayrıştırıp `scripts/patch_app.cjs` ile tablet/native uyarlamalarını uygular. Masaüstü kaynak taşınmışsa projedeki doğrulanmış özgün kopya kullanılır. Bu komut `app.js`, `styles.css`, `index.html` dosyalarını yeniler; normal Gradle derlemesi için gerekmez.

```powershell
npm ci
npm test
npm run qa
npm run qa:customers
```

`scripts/android-qa.cjs` ve `android-util.cjs` yalnızca test için ayrılmış emülatörde kullanılır. Testler örnek kayıtlar oluşturur. Doğrulama ve sınırlar `docs/TEST-RAPORU.md` dosyasında kayıtlıdır. Fiziksel tablet ve fiziksel/Wi-Fi yazıcı testi bu bilgisayarda yapılamadı; API 26 cihazında çalışma zamanı testi yapılmadı.

Resmî Android başvuruları: [yerel WebView içeriği](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content), [HTML yazdırma](https://developer.android.com/training/printing/html-docs), [FileProvider](https://developer.android.com/reference/androidx/core/content/FileProvider), [paylaşım menüsü](https://developer.android.com/develop/ui/compose/sharing/send).
