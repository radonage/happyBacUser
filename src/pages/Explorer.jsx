import WizardContainer from "../components/wizard/WizardContainer";

export default function Explorer() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* Background stylé */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-black to-purple-900/20" />
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-emerald-400 rounded-full blur-[160px] opacity-30 animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-purple-600 rounded-full blur-[180px] opacity-30 animate-pulse" />

      <div className="relative max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Explorer les matières
        </h1>

        <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 shadow-2xl">
          <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-8">
            <WizardContainer />
          </div>
        </div>
      </div>
    </div>
  );
}