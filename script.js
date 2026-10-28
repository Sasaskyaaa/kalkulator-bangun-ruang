// Menjalankan program setelah HTML siap
$(document).ready(function () {

    // ==========================================
    // 1. DATA INPUT SETIAP BANGUN RUANG
    // ==========================================

    const dataInput = {
        kubus: [
            ["s", "Panjang sisi"]
        ],

        balok: [
            ["p", "Panjang"],
            ["l", "Lebar"],
            ["t", "Tinggi"]
        ],

        tabung: [
            ["r", "Jari-jari"],
            ["t", "Tinggi"]
        ],

        bola: [
            ["r", "Jari-jari"]
        ],

        kerucut: [
            ["r", "Jari-jari"],
            ["t", "Tinggi"]
        ],

        prisma: [
            ["a", "Sisi pertama segitiga"],
            ["b", "Sisi kedua segitiga"],
            ["c", "Sisi ketiga segitiga"],
            ["p", "Panjang prisma"]
        ],

        limas4: [
            ["a", "Sisi alas persegi"],
            ["t", "Tinggi limas"],
            ["s", "Tinggi sisi tegak"]
        ],

        limas3: [
            ["a", "Sisi alas segitiga sama sisi"],
            ["t", "Tinggi limas"],
            ["s", "Tinggi sisi tegak"]
        ]
    };


    // ==========================================
    // 2. MENAMPILKAN KOLOM INPUT
    // ==========================================

    function tampilkanInput() {
        const bangun = $("#bangun").val();
        let html = "";

        // Membuat kolom input sesuai bangun yang dipilih
        $.each(dataInput[bangun], function (index, item) {

            html += `
                <label for="${item[0]}">
                    ${item[1]}:
                </label>

                <input
                    type="number"
                    id="${item[0]}"
                    min="0"
                    step="any"
                    placeholder="Masukkan ${item[1].toLowerCase()}"
                    required
                >
            `;
        });

        // Animasi saat kolom input berubah
        $("#inputArea")
            .stop(true, true)
            .slideUp(150, function () {

                $(this)
                    .html(html)
                    .slideDown(250);

            });

        // Menghapus pesan dan hasil sebelumnya
        $("#pesanValidasi").text("");

        $("#hasil")
            .stop(true, true)
            .html(`
                <h2>Hasil Perhitungan</h2>
                <p>Masukkan semua ukuran untuk melihat hasil.</p>
            `);
    }


    // ==========================================
    // 3. VALIDASI INPUT
    // ==========================================

    function ambilNilai(id) {

        const input = $("#" + id);
        const teks = input.val();

        // Memeriksa input kosong
        if (teks === "") {
            input.addClass("invalid").removeClass("valid");

            throw new Error(
                "Semua ukuran wajib diisi."
            );
        }

        const angka = Number(teks);

        // Memeriksa angka nol, negatif, atau tidak valid
        if (!Number.isFinite(angka) || angka <= 0) {
            input.addClass("invalid").removeClass("valid");

            throw new Error(
                "Ukuran harus berupa angka lebih besar dari 0."
            );
        }

        // Memberi tanda bahwa input sudah valid
        input.removeClass("invalid").addClass("valid");

        return angka;
    }


    // ==========================================
    // 4. FUNGSI PERHITUNGAN
    // ==========================================

    function hitung() {

        const bangun = $("#bangun").val();

        let nama = "";
        let volume = 0;
        let luas = 0;

        try {

            switch (bangun) {

                // --------------------------------
                // KUBUS
                // --------------------------------

                case "kubus": {

                    nama = "Kubus";

                    const s = ambilNilai("s");

                    volume = s ** 3;
                    luas = 6 * s ** 2;

                    break;
                }


                // --------------------------------
                // BALOK
                // --------------------------------

                case "balok": {

                    nama = "Balok";

                    const p = ambilNilai("p");
                    const l = ambilNilai("l");
                    const t = ambilNilai("t");

                    volume = p * l * t;

                    luas = 2 * (
                        p * l +
                        p * t +
                        l * t
                    );

                    break;
                }


                // --------------------------------
                // TABUNG
                // --------------------------------

                case "tabung": {

                    nama = "Tabung";

                    const r = ambilNilai("r");
                    const t = ambilNilai("t");

                    volume = Math.PI * r ** 2 * t;

                    luas = 2 * Math.PI * r * (r + t);

                    break;
                }


                // --------------------------------
                // BOLA
                // --------------------------------

                case "bola": {

                    nama = "Bola";

                    const r = ambilNilai("r");

                    volume = (4 / 3) * Math.PI * r ** 3;

                    luas = 4 * Math.PI * r ** 2;

                    break;
                }


                // --------------------------------
                // KERUCUT
                // --------------------------------

                case "kerucut": {

                    nama = "Kerucut";

                    const r = ambilNilai("r");
                    const t = ambilNilai("t");

                    // Menghitung garis pelukis
                    const s = Math.sqrt(r ** 2 + t ** 2);

                    volume = (1 / 3) * Math.PI * r ** 2 * t;

                    luas = Math.PI * r * (r + s);

                    break;
                }


                // --------------------------------
                // PRISMA SEGITIGA
                // --------------------------------

                case "prisma": {

                    nama = "Prisma Segitiga";

                    const a = ambilNilai("a");
                    const b = ambilNilai("b");
                    const c = ambilNilai("c");
                    const p = ambilNilai("p");

                    // Memeriksa apakah sisi membentuk segitiga
                    if (
                        a + b <= c ||
                        a + c <= b ||
                        b + c <= a
                    ) {
                        throw new Error(
                            "Ketiga sisi tidak dapat membentuk segitiga."
                        );
                    }

                    // Rumus Heron
                    const setengahKeliling = (a + b + c) / 2;

                    const luasAlas = Math.sqrt(
                        setengahKeliling *
                        (setengahKeliling - a) *
                        (setengahKeliling - b) *
                        (setengahKeliling - c)
                    );

                    // Menghitung volume dan luas permukaan
                    volume = luasAlas * p;

                    luas = 2 * luasAlas + (a + b + c) * p;

                    break;
                }


                // --------------------------------
                // LIMAS SEGIEMPAT
                // --------------------------------

                case "limas4": {

                    nama = "Limas Segiempat";

                    const a = ambilNilai("a");
                    const t = ambilNilai("t");
                    const s = ambilNilai("s");

                    // Alas berbentuk persegi
                    volume = (a ** 2 * t) / 3;

                    luas = a ** 2 + 2 * a * s;

                    break;
                }


                // --------------------------------
                // LIMAS SEGITIGA BERATURAN
                // --------------------------------

                case "limas3": {

                    nama = "Limas Segitiga Beraturan";

                    const a = ambilNilai("a");
                    const t = ambilNilai("t");
                    const s = ambilNilai("s");

                    // Luas alas segitiga sama sisi
                    const luasAlas =
                        (Math.sqrt(3) / 4) * a ** 2;

                    volume = (luasAlas * t) / 3;

                    luas = luasAlas + (3 * a * s) / 2;

                    break;
                }

            }


            // Memeriksa apakah hasil dapat dihitung
            if (
                !Number.isFinite(volume) ||
                !Number.isFinite(luas)
            ) {
                throw new Error(
                    "Angka terlalu besar untuk dihitung."
                );
            }


            // Membulatkan hasil hingga dua angka desimal
            const formatVolume = volume.toLocaleString(
                "id-ID",
                { maximumFractionDigits: 2 }
            );

            const formatLuas = luas.toLocaleString(
                "id-ID",
                { maximumFractionDigits: 2 }
            );


            // Menyiapkan data hasil
            const dataHasil = {
                nama: nama,
                volume: formatVolume,
                luas: formatLuas
            };


            // Menampilkan hasil secara real-time
            $("#pesanValidasi").text("");

            $("#hasil")
                .stop(true, true)
                .hide()
                .html(`
                    <h2>Hasil Perhitungan</h2>

                    <p>
                        Bangun Ruang:
                        <b>${nama}</b>
                    </p>

                    <p>
                        Volume:
                        <span class="angka">
                            ${formatVolume}
                        </span>
                        satuan kubik
                    </p>

                    <p>
                        Luas Permukaan:
                        <span class="angka">
                            ${formatLuas}
                        </span>
                        satuan persegi
                    </p>
                `)
                .slideDown(250);

            return dataHasil;


        } catch (error) {

            // Menampilkan pesan kesalahan
            $("#pesanValidasi").text(error.message);

            $("#hasil")
                .stop(true, true)
                .html(`
                    <h2>Hasil Perhitungan</h2>
                    <p>
                        Lengkapi dan periksa kembali
                        ukuran yang dimasukkan.
                    </p>
                `);

            return null;
        }
    }


    // ==========================================
    // 5. EVENT PERUBAHAN BANGUN RUANG
    // ==========================================

    $("#bangun").on("change", function () {

        tampilkanInput();

    });


    // ==========================================
    // 6. PERHITUNGAN REAL-TIME
    // ==========================================

    $("#inputArea").on("input", "input", function () {

        hitung();

    });


    // ==========================================
    // 7. EVENT TOMBOL HITUNG DAN ALERT
    // ==========================================

    $("#formHitung").on("submit", function (event) {

        // Mencegah halaman dimuat ulang
        event.preventDefault();

        // Menjalankan perhitungan
        const hasil = hitung();

        // Alert hanya muncul jika semua input valid
        if (hasil !== null) {

            const pesan =
                "Bangun Ruang: " + hasil.nama + "\n" +
                "Volume: " + hasil.volume +
                " satuan kubik\n" +
                "Luas Permukaan: " + hasil.luas +
                " satuan persegi";

            alert(pesan);

        }

    });


    // ==========================================
    // 8. MENAMPILKAN INPUT AWAL
    // ==========================================

    tampilkanInput();

});