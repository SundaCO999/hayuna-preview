# GAP ANALYSIS — Preview vs Produksi

**Dibuat:** 2026-07-27 · **Oleh:** BO Dev
**Preview:** `SundaCO999/hayuna-preview` @ `d0a2663` (commit terakhir **10 Juni 2026**)
**Produksi:** `SundaCO999/HayunaSystem` @ `origin/main` — **dibaca dari KODE, bukan dari dokumen**

> **Kenapa dari kode:** `PRODUCT_SNAPSHOT.md` sedang tidak bisa dipegang — Ko menyatakan
> 2026-07-27 bahwa fitur yang belum diverifikasi sudah masuk ke sana. Jadi seluruh
> kolom "produksi" di laporan ini diambil dari `core/portal.py` (daftar route),
> `core/portal_shell.py` (menu + desain), dan modul `core/portal_*.py`.
> Yang dilaporkan = **yang ada kodenya**. Itu tetap belum tentu = **jalan mulus**.

---

## RINGKASAN SATU HALAMAN

Preview ini **ketinggalan 7 minggu** dan menggambarkan produk yang **berbeda arsitektur**
dari yang sekarang jalan.

| | Preview (10 Juni) | Produksi (sekarang) |
|---|---|---|
| **Bentuk** | 8 dashboard TERPISAH, satu per persona | **SATU portal**, 8 menu |
| **Menu** | tiap agent punya sidebar sendiri | Beranda · Penjualan · Stok · Keuangan · Pelanggan · Tim · Operasional · Pengaturan |
| **Warna** | teal `#0F4C5C` + terracotta `#D4823A` | **hijau `#3E8E72` + amber `#E8A23D`** |
| **Huruf** | Inter Tight + Fraunces (serif) | **Plus Jakarta Sans** (satu huruf) |
| **Agen penjualan** | "Transaksi" (tanpa persona) | **Koko** |
| **Masuk** | invite-only, Fase 1 | **daftar sendiri**, akun auto-dibuat |
| **Trial** | 14 hari | **30 hari** |
| **Bayar** | Midtrans/Xendit | iPaymu — dan **billing DIMATIKAN** |
| **Halaman** | 8 dashboard | **20+ halaman** |

**Angka gapnya:** 17 hal ada di produksi tapi nol di preview · 11 hal ada di preview
tapi nol di produksi · 5 fakta basi.

---

# BAGIAN A — ADA DI PRODUKSI, NOL DI PREVIEW

> Arahan Ko: **langsung update preview.** Status pengerjaan ada di kolom kanan.

### A1. Bentuk aplikasinya sendiri 🔴 paling mendasar

Preview membayangkan **tiap persona punya dashboard sendiri-sendiri** — Budi punya app,
Cici punya app, Alung punya app. Pindah agent = pindah aplikasi.

Produksi **tidak begitu**. Yang ada satu portal dengan satu menu, dan persona muncul
sebagai *keterangan siapa yang mengurus*, bukan sebagai aplikasi terpisah:

- Penjualan — *"Dikelola Koko"*
- Stok — *"Dikelola Budi"*
- Keuangan — *"Dikelola Wulan"*
- Pelanggan — *"Dikelola Cici"*
- Tim — *"Dikelola Bos Alung"*
- Operasional — *"Dikelola Bos Afung"*

Ini **bukan sekadar beda tata letak** — beda cara pakai. Di preview pemilik harus tahu
"ini urusan siapa" sebelum bisa mulai. Di produksi dia cukup tahu "ini urusan apa".
Untuk pemilik warung yang bukan orang teknologi, yang kedua jauh lebih masuk akal.

### A2. Halaman yang sama sekali belum ada di preview

| Halaman produksi | Isinya | Kenapa penting |
|---|---|---|
| **Beranda** (`/portal/home`) | penjualan hari ini · laba bulan ini · perlu perhatian · status Telegram · checklist setup 5 langkah · sisa trial | Ini **halaman pertama** yang dilihat pemilik. Preview nol punya. |
| **Produk & Resep** | kelola menu + resep, bulk produk, kategori | Pintu masuk wajib — tanpa resep, stok nol bisa kepotong |
| **Nota / struk** | dokumen per transaksi, bisa dicetak | — |
| **Pihak** | daftar pelanggan + ringkasan belanja per orang | — |
| **Eskalasi** | pertanyaan pelanggan yang Cici nol sanggup → naik ke pemilik | — |
| **FAQ Cici + unggah dokumen** | kelola jawaban, unggah PDF/Word jadi bahan | Preview punya "Knowledge Loop" — mirip tapi nol sama |
| **Riwayat Aksi** | log jual/batal/koreksi dari dashboard DAN chat | Jejak audit |
| **Pengaturan** | profil bisnis · pengguna portal · notifikasi | Preview **nol punya halaman pengaturan sama sekali** |
| **Onboarding** | isi nama usaha + sambungkan Telegram, ada progresnya | Langkah pertama tiap klien baru |
| **Panel Admin** (`/portal/admin`) | daftar tenant · perpanjang trial · comp · health · log | Ruang kontrol Ko sendiri |
| **Rekap Nilai** | prototipe rating kepuasan pelanggan | Masih prototipe |

### A3. Isi halaman yang jauh lebih dalam dari preview

**Stok** — preview: Dashboard · Stok Aktual · Transaksi · Stok Menipis · Konsumsi.
Produksi juga punya: **catat belanja (satuan + borongan) · stock opname · koreksi belanja ·
riwayat gerakan stok · ubah satuan · kelola supplier · tambah bahan baru**.

**Penjualan** — preview cuma daftar order. Produksi: **catat jual · catat pemasukan
(total / per sumber) · batalkan penjualan (bernomor, jejak nol dihapus) · mode kasir**.

**Tim** — preview: Dashboard · Karyawan · Kandidat · Onboarding · Promosi · Flags · Schedule.
Produksi menyusunnya jadi **tiga sub-menu: Ringkasan · Rekrutmen · Training**, dengan
puluhan aksi (generate soal, kunci soal, kirim tes, nilai esai, promosi, offboard,
ambang kelulusan, jadwal).

### A4. Fakta yang sudah basi di preview

| Ditulis di preview | Kenyataan sekarang |
|---|---|
| "trial 14 hari" | **30 hari** (`core/billing.py` `TRIAL_DAYS = 30`) |
| "Fase 1: akses invite-only" | **daftar sendiri** — akun otomatis dibuat saat pertama masuk |
| "bayar via Midtrans/Xendit" | iPaymu — dan **billing dimatikan**, halaman paket nol tampil |
| "Login: username / password" | Google OAuth **atau** email+password, satu pintu |
| Nol ada Koko | **Koko** = agen penjualan (R50), Budi jadi stok-saja |

### A5. Chat DI DALAM dashboard 🔴 **KELEWAT DI LAPORAN PERTAMA — dikoreksi Ko**

> **Koreksi jujur:** di terbitan pertama laporan ini, chat ditulis di Bagian B9 sebagai
> *"sudah ada padanannya"*. **Itu salah.** Ko yang menangkapnya. Yang saya lakukan adalah
> menyamakan dua hal yang bentuknya beda — dan justru bedanya itu intinya.

| | Preview | Produksi |
|---|---|---|
| Bentuk | `chat.html` — **halaman tersendiri**, semboyannya *"skip dashboard, langsung ngobrol"* | **widget mengambang di SETIAP halaman** portal |
| Cara sampai | pindah halaman dulu | tinggal pencet, nol pindah dari halaman yang sedang dibuka |
| Nama | "Hayuna" | **"Hana"** |
| Isi | bebas | perintah kerja: *jual kopi susu 2 · belanja gula 2kg 30rb · cek stok gula · rekap hari ini* |

**Kenapa bedanya penting.** Preview memaksa pemilik **memilih**: mau lihat dashboard, atau
mau ngobrol. Produksi nol memaksa apa pun — dia bisa lagi melihat halaman Stok, lalu
langsung menyuruh "belanja gula 2kg 30rb" tanpa berpindah ke mana-mana. Perintahnya masuk
ke **jalur yang sama persis** dengan chat Telegram, lengkap dengan konfirmasi
"Bener? ya/batal" sebelum apa pun dicatat.

Ini yang di kode produksi sendiri diberi nama **"gap I"** (`core/portal_chat.py`) — jadi
memang disadari sebagai kekurangan penting, dan sudah ditutup di sana, tapi nol tercermin
di preview.

**Batas jujur yang ikut disalin ke preview:** di web **nol ada obrolan bebas** — cuma
perintah kerja yang deterministik. Obrolan bebas tetap di Telegram. Ini ditulis apa adanya
di dalam widget, bukan disembunyikan.

**Status:** ✅ sudah dipasang di `portal-produksi.html`, mengambang di semua halaman,
persis seperti produksi.

### A6. Bahasa desain

| | Preview | Produksi |
|---|---|---|
| Warna utama | teal `#0F4C5C` | hijau `#3E8E72` |
| Aksen | terracotta `#D4823A` | amber `#E8A23D` |
| Latar | pasir `#FBF7F2` | krem `#FBF8F2`, halaman `#DAD6CD` |
| Huruf badan | Inter Tight | **Plus Jakarta Sans** |
| Huruf judul | Fraunces (serif) | **Plus Jakarta Sans** (nol serif) |

Produksi mengunci ini sebagai **Design v1.0 / R59**. Preview memakai palet yang dikunci
`2026-05-26` — versi sebelumnya.

---

# BAGIAN B — ADA DI PREVIEW, NOL DI PRODUKSI

> Arahan Ko: **jangan sentuh produksi.** Ini analisis + usulan saja.
> Tiap butir dinilai: apakah layak dibangun, dan apa risikonya.

## B1. Konektor POS ⛔ **JANGAN DIBANGUN** — ✅ SUDAH DIBUANG (Ko, 2026-07-27)

> **Selesai.** Ko menyetujui usul ini dan seluruh jejaknya sudah dibuang dari preview:
> menu sidebar + halaman "Konektor POS" (Moka, Pawoon/Olsera, webhook custom) di
> `transaksi-dashboard.html`, kartu metrik "Sumber: POS", butir "Konektor POS" di daftar
> paket `billing.html`, dan kalimat "POS nyusul" di `portal.html`, `index.html`,
> `landing.html`. **Nol sebutan POS tersisa di seluruh preview.**

**Di preview (dulu):** `transaksi-dashboard.html` → menu "Konektor POS".

**Penilaian:** ini menabrak **garis merah** yang masih berlaku. Aturan produk menyebut
integrasi POS/mesin kasir *"nol ada di rencana"*, dan chat website sudah dipagari untuk
menolaknya. Menampilkannya di preview berbahaya: preview sering jadi bahan jualan, dan
sekali ada calon klien melihatnya, dia akan menganggap itu janji.

**Usul:** **buang dari preview.** Bukan ditunda — dibuang.

## B2. Dashboard Marketing 🟡 **DITAHAN** — analisis saya SALAH, dikoreksi Ko

> **Koreksi Ko 2026-07-27:** *"ini marketing untuk klien, ini tahan dulu, masih belum
> dibuat. Harus bisa bedakan agent product, dengan agent yang kerja buat product."*

**Di preview:** `marketing-dashboard.html` → Marketing · Generator Konten · Campaign.

**Kesalahan saya.** Saya menyimpulkan ini alat jualan Ko sendiri, lalu mengusulkan
memindahkannya ke BO Console. Salah. Ini **agen produk** — yang membantu **klien**
memasarkan warungnya. Tempatnya memang di dalam produk.

**Beda yang saya kaburkan — dan ini pembeda penting:**

| | Agen PRODUK | Agen yang kerja BUAT produk |
|---|---|---|
| Bekerja untuk | usaha si klien | Hayuna sendiri |
| Tinggal di | portal klien (HayunaSystem) | BO Console |
| Contoh | Koko, Budi, Wulan, Cici, **Marketing** | mesin cari prospek, eskalasi chat website |

Dua-duanya bisa disebut "marketing", dan itu yang membuat saya keliru. Yang membedakan
bukan namanya — tapi **siapa yang jadi untung dari pekerjaannya**.

**Kenapa saya keliru:** saya menilai dari isinya ("generator konten") lalu menebak
pemakainya. Yang benar dibalik — tentukan dulu siapa pemakainya, baru dinilai. Warung yang
mau ramai memang butuh bantuan bikin konten promo; itu kebutuhan klien, bukan kebutuhan Ko.

**Status: DITAHAN.** Belum dibangun di produksi, dan belum saatnya dibahas. Tetap di
preview sebagai gambaran arah, TAPI **jangan dipakai bahan jualan** sampai benar-benar ada.

## B3. B-mini ❌ **DIHAPUS DARI PREVIEW** (Ko, 2026-07-27)

**Keputusan Ko:** *"B-mini ini di produksinya admin console, tapi untuk di preview
gak usah dulu, jadi hapus aja."*

Jadi ini **bukan gap** — fungsinya memang sudah ada di produksi sebagai **panel admin**
(`/portal/admin`: daftar tenant, perpanjang trial, comp, health, log error berperingkat).
Yang salah cuma preview-nya: dia menggambarkannya sebagai **aplikasi terpisah**, padahal
di produksi itu bagian dari portal.

**Dikerjakan:** `bmini.html` dihapus, plus semua yang menunjuk ke sana —
tautan di `portal.html` (dua tempat) dan keterangan di `bos-hayuna-dashboard.html`.
**Nol tautan mati** tersisa (dicek browser).

Bentuk produksinya tetap bisa dilihat di `portal-produksi.html` → menu **Panel admin**.

## B4. Dashboard Bos Afung ⏸️ **DIKONFIRMASI BELUM DIBANGUN** — ✅ sudah dilabeli

**Di preview:** Operasional Hari Ini · Shift · Checklist Ops.

**Penilaian:** produksi punya halaman `/portal/operasional` (*"Dikelola Bos Afung"*), tapi
Afung sendiri berstatus **belum dibangun** — masih sambungan kosong Fase 2. Jadi preview
menggambarkan sesuatu yang lebih maju dari kenyataan.

**Ko mengonfirmasi 2026-07-27:** *"ya Afung memang belum dibangun, masih nunggu."*

**Dikerjakan:** spanduk `bos-afung-dashboard.html` diganti jadi peringatan tegas —
*"BOS AFUNG BELUM DIBANGUN — masih sambungan kosong Fase 2. Halaman ini gambaran arah
doang. JANGAN dipakai bahan jualan."* Halamannya tetap disimpan sebagai gambaran arah.

## B5. Mode gelap ✅ **DIKONFIRMASI GAP PRODUKSI** (Ko, 2026-07-27)

**Di preview:** tiap dashboard punya tombol terang/gelap, tersimpan di `localStorage`.

**Penilaian:** produksi **nol punya sama sekali** — nol ada `data-theme`, nol ada
`prefers-color-scheme`. Ini gap yang benar-benar preview lebih unggul.

**Ko mengonfirmasi 2026-07-27:** *"mode gelap ini gap production yang belum ada."*

Jadi ini **satu-satunya butir Bagian B yang berdiri sebagai gap produksi sungguhan** —
preview lebih unggul, dan produksi memang belum punya.

**Catatan saya yang tetap berlaku:** pemilik warung memakai portal ini di dapur, siang
hari, layar terang. Mode gelap nyata kurangnya, tapi **bukan yang paling mereka rasakan**.
Dicatat sebagai gap terbuka; waktu pengerjaannya keputusan Ko.

**Preview tetap memegang mode gelap** — jadi acuannya sudah ada kalau nanti dibangun.

## B6. Melihat isi percakapan pelanggan ❌ **DIBUANG** — diganti gagasan yang lebih baik

**Keputusan Ko 2026-07-27:** *"buang aja, yang ada hanya spam dashboard nanti. Yang
diperlukan adalah rekapan topik yang sering ditanya oleh calon/customer klien."*

**Kenapa usul saya kurang tepat.** Saya mengusulkan halaman berisi transkrip percakapan.
Untuk warung yang ramai itu jadi **tumpukan yang nol pernah dibaca** — makin banyak
pelanggan, makin nol berguna. Menambah halaman yang nol dibaca itu bukan menambah nilai,
cuma menambah yang harus dijaga.

**Yang sebenarnya dibutuhkan: REKAP TOPIK.** Bukan "siapa bilang apa", tapi *"minggu ini
23 orang menanyakan jam buka, 11 menanyakan menu tanpa pedas, 8 menanyakan pesan
banyak"*. Itu **memampatkan** alih-alih menumpuk — dan langsung bisa ditindaklanjuti:
topik yang sering muncul berarti jawabannya perlu masuk FAQ Cici, atau justru menandakan
peluang menu baru.

**Kelebihan lain:** rekap topik nol perlu menampilkan isi percakapan pelanggan satu per
satu — jadi lebih aman dari sisi data pribadi.

**Status:** dicatat sebagai **permintaan baru**, bukan lanjutan B6. Perlu diputuskan
PM/Ko, dan perlu dipastikan dulu datanya memang tersimpan cukup untuk dikelompokkan.

## B7. Analisis konsumsi bahan ✅ **DISESUAIKAN KE PRODUKSI** (Ko, 2026-07-27)

**Keputusan Ko:** *"sesuaikan dengan produksi yang sudah live."*

Jadi bukan dibangun di produksi — **preview-nya yang diluruskan**. Menu "Konsumsi" di
`budi-dashboard.html` berisi grafik konsumsi 7 hari yang **nol ada padanannya** di
produksi. Itu karangan preview, dan karangan begini yang bikin orang salah sangka.

**Diganti dengan yang BENERAN jalan** di halaman Stok produksi (`core/portal_stok.py`):

| Menu preview | Isi sekarang |
|---|---|
| ~~Konsumsi~~ → **Belanja &amp; Opname** | catat belanja masuk (satuan otomatis dikonversi, bulk = satu konfirmasi) · opname &amp; koreksi belanja (jejak nol dihapus) · kelola supplier · ubah satuan |

Gagasan "rangkuman konsumsi bahan" sendiri **belum ada di produksi**. Kalau suatu saat mau
dibangun, itu permintaan baru — bukan sesuatu yang preview boleh tampilkan lebih dulu.

## B8. Bagan struktur organisasi AI ❌ **DIBUANG**

**Keputusan Ko 2026-07-27:** nol usah.

Nol dikerjakan, nol dibawa ke materi jualan.

## B9–B11. Sisanya — sudah ada padanannya di produksi

| Preview | Padanan produksi | Vonis |
|---|---|---|
| Bos Hayuna: "Ringkasan Bisnis" | Beranda | sudah ada |
| Bos Hayuna: "Tanya GM" | widget "Tanya Hana" mengambang di tiap halaman | ⚠️ **BARIS INI YANG BIKIN KELEWAT — lihat A5.** Saya menulis "sudah ada" padahal bentuknya beda jauh, dan bedanya itu justru gapnya. |
| Cici: "Knowledge Loop" | FAQ + unggah dokumen | sudah ada |
| Alung: Kandidat/Promosi/Schedule | `/portal/alung/*` (puluhan aksi) | **produksi jauh lebih lengkap** |

> **Pelajaran dari kelewatnya A5.** Tabel "sudah ada padanannya" ini berbahaya: begitu
> sesuatu masuk ke sini, dia berhenti diperiksa. Padahal "ada padanannya" ≠ "sama".
> Chat ada di dua sisi — tapi di preview berupa halaman terpisah, di produksi berupa
> widget di tiap halaman. Saya mencatat kesamaan namanya, bukan bedanya bentuknya.
>
> **Aturan untuk laporan berikutnya:** kalau dua hal cuma *mirip*, jangan ditulis
> "sudah ada" — tulis apa persisnya yang beda. Yang mirip-tapi-beda justru lebih sering
> jadi gap daripada yang jelas-jelas nol ada.

---

# RENCANA

### Sudah dikerjakan sesi ini (Bagian A — preview diperbarui)
1. Palet + huruf preview disamakan ke produksi (Design v1.0 / R59).
2. Preview portal baru yang **mencerminkan bentuk produksi**: satu portal, menu yang sama.
3. Fakta basi dibetulkan (trial 30 hari · daftar sendiri · billing dimatikan · Koko).
4. Halaman produksi yang belum ada, ditambahkan ke preview.

### Menunggu keputusan Ko (Bagian B)
| # | Usul | Keputusan Ko (2026-07-27) | Status |
|---|---|---|---|
| B1 | Konektor POS | ⛔ buang — garis merah | ✅ selesai |
| A5 | Chat di dalam dashboard *(kelewat, ditangkap Ko)* | pasang | ✅ selesai |
| B3 | B-mini | hapus dari preview — di produksi = panel admin | ✅ selesai |
| B7 | Konsumsi bahan | sesuaikan ke produksi yang live | ✅ selesai |
| B4 | Bos Afung | konfirmasi belum dibangun, kasih label | ✅ selesai |
| B6 | Lihat isi percakapan Cici | ❌ buang — "cuma jadi spam dashboard" | ✅ selesai |
| B8 | Bagan struktur AI | ❌ buang | ✅ selesai |
| B2 | Dashboard Marketing *(agen PRODUK, analisis saya salah)* | ⏸️ tahan — belum dibuat | — |
| B5 | Mode gelap | ✅ diakui **gap produksi** yang belum ada | ⬜ nunggu waktu |
| **BARU** | **Rekap TOPIK yang sering ditanya** calon/customer | permintaan Ko, pengganti B6 | ⬜ perlu dibahas |

**Sisa yang benar-benar terbuka tinggal dua:** mode gelap (B5) dan rekap topik (baru).
Delapan butir lain sudah tuntas.

### Batas jujur laporan ini
- Produksi dibaca dari **kode**, bukan dari layar yang benar-benar jalan. Ada kodenya
  ≠ jalan mulus. Ko sendiri menyatakan produk sedang berantakan.
- BO Dev **nol pernah masuk** ke dalam portal produksi (butuh akun klien), jadi kualitas
  tiap halaman nol bisa dinilai dari sini — cuma keberadaannya.
- Nol satu pun berkas di `HayunaSystem` disentuh. Repo itu **dibaca saja**.
