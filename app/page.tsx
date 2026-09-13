export default function Home() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top, rgba(190, 18, 60, 0.18), transparent 34%), #080808",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "680px",
          textAlign: "center",
          padding: "48px 28px",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "74px",
            height: "74px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(190,18,60,0.14)",
            fontSize: "34px",
          }}
        >
          !
        </div>

        <p
          style={{
            margin: "0 0 12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "12px",
            color: "#fb7185",
            fontWeight: 700,
          }}
        >
          Aviso
        </p>

        <h1
          style={{
            margin: "0",
            fontSize: "clamp(34px, 7vw, 58px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 800,
          }}
        >
          Site indisponível
        </h1>

        <p
          style={{
            margin: "22px auto 0",
            maxWidth: "500px",
            fontSize: "clamp(17px, 3vw, 21px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.74)",
          }}
        >
          Falar com <strong style={{ color: "#ffffff" }}>Joabest</strong> para acessar.
          <br />
          Obrigado.
        </p>
      </section>
    </main>
  );
}
