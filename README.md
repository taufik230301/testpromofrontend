Jalankan Frontend (`my-test-app`)

```bash
cd my-test-app
npm install
```

Pilihan menjalankan app:

- Jalankan di emulator Android:

```bash
npm run android
```

- Jalankan di simulator iOS:

```bash
npm run ios
```

- Jalankan di web browser:

```bash
npm run web
```

- Jalankan langsung ke device Android:

```bash
npx expo run:android
```

---

## ⚡ Catatan

ganti baseurl dengan ip local komputer

jalan kan comand untuk mendapatkan ip komputer :

- ipconfig getifaddr en0

- Pastikan **DB container** sudah jalan sebelum backend dijalankan.
- Table `promos` menggunakan `JSONB` untuk menyimpan `terms`, fleksibel untuk aturan promo.
- Untuk optimasi performa di frontend, bisa gunakan `React.memo` dan `useCallback` jika perlu.

Kalau error masih soal Gradle / variant / dependency

Tambahkan langkah ini sebelum expo run:android:

rm -rf android/.gradle
rm -rf android/build
rm -rf ~/.gradle/caches
npx expo prebuild --clean

Lalu:

cd android
./gradlew clean --refresh-dependencies
cd ..
npx expo run:android

---
