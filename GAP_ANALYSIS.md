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

### A5. Bahasa desain

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

## B1. Konektor POS ⛔ **JANGAN DIBANGUN**

**Di preview:** `transaksi-dashboard.html` → menu "Konektor POS".

**Penilaian:** ini menabrak **garis merah** yang masih berlaku. Aturan produk menyebut
integrasi POS/mesin kasir *"nol ada di rencana"*, dan chat website sudah dipagari untuk
menolaknya. Menampilkannya di preview berbahaya: preview sering jadi bahan jualan, dan
sekali ada calon klien melihatnya, dia akan menganggap itu janji.

**Usul:** **buang dari preview.** Bukan ditunda — dibuang.

## B2. Dashboard Marketing 🟡 **SALAH KANTOR**

**Di preview:** `marketing-dashboard.html` → Marketing · Generator Konten · Campaign.

**Penilaian:** ini bukan fitur yang dipakai klien warung — ini alat **Ko sendiri** untuk
menjual Hayuna. Menaruhnya di dalam produk berarti tiap klien melihat menu yang nol ada
gunanya buat dia.

Ditambah: "Generator Konten" artinya LLM menulis materi jualan. Melihat masalah yang baru
saja terjadi (klaim belum terverifikasi bocor ke website), fitur yang **mengarang materi
promosi otomatis** justru yang paling rawan sekarang.

**Usul:** **pindahkan ke BO Console**, bukan ke produk. Di sana sudah ada tab Growth dan
Eskalasi — marketing adalah tetangganya. Prioritas: rendah, dan wajib ada persetujuan
manusia sebelum apa pun terbit.

## B3. B-mini (monitor internal lintas tenant) 🟢 **SEBAGIAN SUDAH ADA**

**Di preview:** `bmini.html` → kesehatan sistem, agent online, anomali, eskalasi terbuka —
lintas tenant, khusus Ko.

**Penilaian:** produksi **sudah punya sebagian**: `/portal/admin` (daftar tenant, health,
log error berperingkat). Yang belum: tampilan "agent online 3/3" dan "anomali aktif".

**Usul:** **jangan bikin aplikasi terpisah.** Lebur ke panel admin yang sudah ada.
Menambah satu aplikasi lagi = satu lagi yang harus dijaga. Prioritas: sedang.

## B4. Dashboard Bos Afung 🟡 **PERSONANYA MEMANG BELUM ADA**

**Di preview:** Operasional Hari Ini · Shift · Checklist Ops.

**Penilaian:** produksi punya halaman `/portal/operasional` (*"Dikelola Bos Afung"*), tapi
Afung sendiri berstatus **belum dibangun** — masih sambungan kosong Fase 2. Jadi preview
menggambarkan sesuatu yang lebih maju dari kenyataan.

**Usul:** **tahan.** Boleh disimpan sebagai gambaran arah, TAPI diberi label jelas
"belum dibangun" supaya nol pernah dipakai jualan. Prioritas: rendah (Fase 2).

## B5. Mode gelap 🟢 **GAP NYATA, KECIL**

**Di preview:** tiap dashboard punya tombol terang/gelap, tersimpan di `localStorage`.

**Penilaian:** produksi **nol punya sama sekali** — nol ada `data-theme`, nol ada
`prefers-color-scheme`. Ini gap yang benar-benar preview lebih unggul.

**Penilaian jujur:** pemilik warung memakai portal ini di dapur, siang hari, HP terang.
Mode gelap **bukan** masalah yang mereka rasakan. Bagus, tapi bukan sekarang.

**Usul:** catat sebagai keinginan, kerjakan setelah ada klien yang memintanya. Prioritas: rendah.

## B6. Melihat isi percakapan pelanggan 🟢 **GAP NYATA, LAYAK**

**Di preview:** `cici-dashboard.html` → "Percakapan" + "Aktivitas Harian".

**Penilaian:** produksi cuma punya **Eskalasi** — yaitu percakapan yang *gagal*. Yang
berhasil nol bisa dilihat sama sekali.

Ini gap yang **paling layak dikerjakan** dari seluruh Bagian B. Alasannya: pemilik nol
punya cara tahu Cici menjawab apa ke pelanggannya. Itu masalah kepercayaan — dan
kepercayaan adalah hal yang paling sulit dijual dari produk AI. Sekarang pemilik diminta
percaya pada sesuatu yang nol bisa dia periksa.

**Usul:** **bangun** — halaman baca-saja berisi percakapan Cici. Prioritas: **tinggi**,
tapi tetap keputusan PM/Ko, bukan BO Dev.

## B7. Analisis konsumsi bahan 🟢 **GAP NYATA, SEDANG**

**Di preview:** `budi-dashboard.html` → menu "Konsumsi".

**Penilaian:** produksi punya **riwayat gerakan stok** (daftar kejadian), tapi nol punya
rangkuman *"bahan ini habis berapa per minggu"*. Padahal datanya sudah ada — tinggal
dihitung.

**Usul:** layak, murah, dan langsung kepakai untuk memperkirakan belanja. Prioritas: sedang.

## B8. Bagan struktur organisasi AI 🟢 **KECIL, TAPI KUAT UNTUK JUALAN**

**Di preview:** `portal.html` menampilkan bagan — Bos Hayuna (GM) di puncak, tiap persona
mengurus departemennya, bisa diklik.

**Penilaian:** produksi cuma menampilkan daftar "Karyawan AI kamu" di beranda. Bagan
preview **jauh lebih menjelaskan** apa yang sebenarnya dibeli orang: bukan satu bot, tapi
sebuah tim.

**Usul:** ini gagasan terbaik di preview. Pakai di **materi jualan** dulu (murah, nol
risiko), baru dipertimbangkan masuk portal. Prioritas: rendah untuk produk, **tinggi untuk
marketing**.

## B9–B11. Sisanya — sudah ada padanannya di produksi

| Preview | Padanan produksi | Vonis |
|---|---|---|
| Bos Hayuna: "Ringkasan Bisnis" | Beranda | sudah ada |
| Bos Hayuna: "Tanya GM" | `POST /portal/chat` + "Tanya Hayuna" di beranda | sudah ada |
| Cici: "Knowledge Loop" | FAQ + unggah dokumen | sudah ada |
| Alung: Kandidat/Promosi/Schedule | `/portal/alung/*` (puluhan aksi) | **produksi jauh lebih lengkap** |

---

# RENCANA

### Sudah dikerjakan sesi ini (Bagian A — preview diperbarui)
1. Palet + huruf preview disamakan ke produksi (Design v1.0 / R59).
2. Preview portal baru yang **mencerminkan bentuk produksi**: satu portal, menu yang sama.
3. Fakta basi dibetulkan (trial 30 hari · daftar sendiri · billing dimatikan · Koko).
4. Halaman produksi yang belum ada, ditambahkan ke preview.

### Menunggu keputusan Ko (Bagian B)
| # | Usul | Prioritas | Keputusan |
|---|---|---|---|
| B1 | Buang Konektor POS dari preview | **kerjakan sekarang** | ⬜ |
| B6 | Halaman lihat percakapan Cici | tinggi | ⬜ |
| B8 | Bagan struktur AI buat materi jualan | tinggi (marketing) | ⬜ |
| B3 | Lebur B-mini ke panel admin | sedang | ⬜ |
| B7 | Rangkuman konsumsi bahan | sedang | ⬜ |
| B2 | Pindahkan Marketing ke BO Console | rendah | ⬜ |
| B4 | Afung — tahan, beri label "belum dibangun" | rendah | ⬜ |
| B5 | Mode gelap | rendah | ⬜ |

### Batas jujur laporan ini
- Produksi dibaca dari **kode**, bukan dari layar yang benar-benar jalan. Ada kodenya
  ≠ jalan mulus. Ko sendiri menyatakan produk sedang berantakan.
- BO Dev **nol pernah masuk** ke dalam portal produksi (butuh akun klien), jadi kualitas
  tiap halaman nol bisa dinilai dari sini — cuma keberadaannya.
- Nol satu pun berkas di `HayunaSystem` disentuh. Repo itu **dibaca saja**.
