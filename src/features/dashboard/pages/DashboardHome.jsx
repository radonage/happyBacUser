import WizardContainer from "../../../components/wizard/WizardContainer";

export default function DashboardHome() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-black to-purple-900/20" />
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-emerald-400 rounded-full blur-[160px] opacity-30 animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-purple-600 rounded-full blur-[180px] opacity-30 animate-pulse" />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-pink-500 rounded-full blur-[200px] opacity-20" />

      <div className="relative max-w-6xl mx-auto p-6">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
            🎓 Happy Bac
            <br />
          </h1>

          <p className="text-gray-300 mt-4 text-lg max-w-1xl mx-auto">
            Tout ce qu’il te faut pour réussir, y compris les examens nationaux avec leurs corrections en vidéo.
          </p>

          <div className="mt-8">
            <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-purple-600 hover:scale-105 transition font-semibold shadow-xl">
              Commencez l'apprentissage
            </button>
          </div>
        </div>

        {/* 🎯 WIZARD */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 shadow-2xl">
          <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-8">
            <WizardContainer />
          </div>
        </div>

      </div>
    </div>
  );
}