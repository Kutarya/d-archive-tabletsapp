# BT Souvenirs Tablet 1.1.0 — Doğrulama

2 Kasım 2026. Proje: `D:\TabletsApp`. Paket: `com.btsouvenirs.tablet`, sürüm `1.1.0` / kod `2`.

Teslim edilen release APK emülatöre kuruldu ve açıldı. Ürün/müşteri başlangıç verileri ve logo görüldü; Customers ekranındaki ayrı içe/dışa aktarım düğmeleri son release kurulumunda kontrol edildi. APK hata ayıklamaya açık değildir. Android 8 / API 26 minimum, target SDK 36. Test emülatörü Android 17 / API 37'dir; uçak modu açık kullanıldı.

## Geçen kontroller

- Node: 9 veri doğrulama ve müşteri defteri birleştirme testi.
- Tarayıcı: 15 temel senaryo ve 5 müşteri defteri/düzen senaryosu. 1280×800, 800×1280, 600×960, 412×915, 360×800 ve 640×388 görünümleri; yatay sayfa/tablo taşması yok.
- Android native: 4 instrumentation testi; origin sınırı, atomik kurtarma, dosya adı sınırı ve PDF FileProvider'ın müşteri veritabanını dışarı açmaması.
- Android çalışma akışı: gerçek native köprü, klavye/Geri, yatay/dikey dönüşte taslak, yerel kayıt ve özel atomik kopya doğrulandı.
- Android dosyaları: müşteri defteri ayrı JSON dışa aktarımı, aynı dosyanın birleştirilerek içe alınması, tam JSON yedek dışa/geri yükleme, müşteri XML dosyası ve teslimat adresleri kontrol edildi. Zorla kapatıp açma ve eksik WebView kaydının özel kopyadan kurtarılması geçti.
- Android Print Framework ile gerçek bir A4 PDF dosyası kaydedildi; 72,56 EUR örnek toplamı ve logo doğrulandı. Uzun tarayıcı çıktısındaki 150/150 satır ve tek genel toplam kontrol edildi.
- Belge listesindeki Share ve önizlemedeki Share PDF yolları Android paylaşım menüsünü açtı. 1 sayfa ve 60 satır/3 sayfa PDF, 160 ve 320 dpi Android ekran yoğunluklarında test edildi. Paylaşılan her A4 sayfa 2382×3369 piksel içeriyor; tüm sayfalar ve 001–060 satırları görsel olarak incelendi. WhatsApp yerine emülatörde kurulu hedefler listelendi; herhangi bir kişiye mesaj gönderilmedi.
- Release derlemesi ve lint tamamlandı: 0 hata, 8 uyarı. Uyarılar araç/bağımlılık sürümleri, launcher kaynak önerileri ve küçük API kullanım önerileridir.
- APK v2 imzası doğrulandı; APK içindeki bütün assets dosyaları proje kaynaklarıyla birebir karşılaştırıldı.

## Korunan veri ve kapsam

Özgün HTML'nin SHA-256 değeri: `f1ca69be358694a09bc12a64644d4877c2ec8fb01065f28092ae96a27b1ab35c`. 60 müşteri, 9 ürün, kategoriler ve özgün JPEG logo korunmuştur. Test örnekleri APK başlangıç verilerine eklenmemiştir. Kullanıcının masaüstü tarayıcı profiline veya canlı kayıtlarına erişilmemiştir.

Müşteri defteri dışa aktarımı yalnızca müşterileri/adresleri içerir. Tam JSON yedek ayrıca belgeleri ve ayarları içerir. Paylaşım menüsüne yalnızca oluşturulan PDF için geçici okuma izni verilir. Paylaşım PDF'si yüksek çözünürlüklü görüntü tabanlıdır; Yazdır/PDF kaydet Android'in özgün belge adaptörünü kullanır.

## Sınırlar

Fiziksel tablet, API 26 çalışma zamanı, fiziksel/Wi-Fi yazıcı ve gerçek WhatsApp sohbetine gönderim testi yapılmadı. Yazıcı keşfi Android yazdırma hizmetine, WhatsApp hedefi ilgili uygulamanın tablette kurulu olmasına bağlıdır.

Emülatörün ilk Gradle yönetimli test başlatması süreç açılışında tamamlanmadı. Test APK'sı doğrudan kurularak aynı instrumentation runner ile son 4 native testin tamamı başarıyla çalıştırıldı; sonuç `artifacts/android/native-contract-final.txt` dosyasındadır.

## Teslimat

APK SHA-256: `cb3e31ab77dcacfb88de12ce13818e3f2f2aac00913d765df18eb9899732c368`

Release imzalama anahtarı ve parolaları `D:\TabletsApp\signing` içinde yereldir. Kaynak ZIP'e özel anahtar/parola, makineye özel SDK ayarı, build önbelleği veya emülatör diski konmamıştır. Bu release için ileride güncelleme üretirken yereldeki aynı imzalama anahtarını koruyun.
