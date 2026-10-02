import { useState, useEffect } from "react";
import { Review } from "../types";
import { Star, MessageSquare, ShieldCheck, Heart, User, Check, Sparkles } from "lucide-react";

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    roomType: "Chambre Confort"
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (res.ok) {
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) {
      setError("Veuillez remplir votre nom et votre commentaire.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(true);
        setFormData({ name: "", rating: 5, comment: "", roomType: "Chambre Confort" });
        await fetchReviews();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Impossible d'enregistrer votre avis.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div class="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            class={`h-3.5 w-3.5 ${
              star <= rating ? "fill-current text-gold" : "text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div id="reviews-section-wrapper" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Title */}
      <div class="text-center mb-12">
        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean">Témoignages & Avis Clients</h2>
        <p class="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          Découvrez les expériences vécues par nos hôtes lors de leur séjour à l'Hôtel EDIVINCE A.N Kribi.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Testimonials stream */}
        <div class="lg:col-span-8 space-y-6">
          {loading ? (
            <div class="flex justify-center py-10">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean"></div>
            </div>
          ) : (
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-ocean/5 border border-gold/20 flex items-center justify-center font-bold text-ocean text-xs">
                          {review.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 class="font-bold text-ocean text-sm">{review.name}</h4>
                          <span class="text-[9px] text-gray-400 font-semibold uppercase tracking-wider block">Chambre {review.roomType}</span>
                        </div>
                      </div>
                      <div class="bg-gold/10 text-ocean px-2 py-1 rounded text-[9px] font-bold tracking-wider flex items-center gap-1">
                        <ShieldCheck class="h-3 w-3 text-gold" />
                        <span>Vérifié</span>
                      </div>
                    </div>

                    <p class="text-xs text-gray-600 leading-relaxed font-sans mb-4 italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div class="flex items-center justify-between border-t border-[#F4EBE1] pt-3 text-[10px] text-gray-400">
                    {renderStars(review.rating)}
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Form to submit reviews */}
        <div class="lg:col-span-4 bg-[#F4EBE1]/40 border border-gold/20 rounded-2xl p-6 shadow-sm">
          <div class="mb-4">
            <h3 class="font-serif text-xl font-bold text-ocean flex items-center gap-1.5">
              <Sparkles class="h-5 w-5 text-gold" />
              <span>Votre Avis nous intéresse</span>
            </h3>
            <p class="text-[11px] text-gray-500">
              Partagez votre expérience à l'Hôtel EDIVINCE pour guider les prochains voyageurs.
            </p>
          </div>

          {success && (
            <div class="bg-green-50 border border-green-200 text-green-700 text-xs px-4 py-3 rounded-xl mb-4 flex items-center gap-2 animate-in fade-in duration-200">
              <Check class="h-4 w-4" />
              <span>Merci ! Votre avis a été enregistré avec succès.</span>
            </div>
          )}

          {error && (
            <div class="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmitReview} class="space-y-3.5 text-xs">
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Votre Nom *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Jean-Pierre M."
                class="w-full bg-white border border-gold/20 focus:border-gold focus:outline-none px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Catégorie de chambre séjournée</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                class="w-full bg-white border border-gold/20 focus:border-gold focus:outline-none px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >
                <option value="Chambre Confort">Chambre Confort</option>
                <option value="Chambre Prestige">Chambre Prestige</option>
                <option value="Chambre Premium">Chambre Premium</option>
                <option value="Chambre Twin">Chambre Twin</option>
                <option value="Suite Junior">Suite Junior</option>
                <option value="Suite Prestige">Suite Prestige</option>
                <option value="Suite Vue Mer">Suite Vue Mer</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Votre Note (Étoiles)</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                class="w-full bg-white border border-gold/20 focus:border-gold focus:outline-none px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer font-bold text-gold"
              >
                <option value="5">⭐⭐⭐⭐⭐ (Excellent séjour)</option>
                <option value="4">⭐⭐⭐⭐ (Très bon rapport qualité-prix)</option>
                <option value="3">⭐⭐⭐ (Satisfaisant)</option>
                <option value="2">⭐⭐ (Moyen)</option>
                <option value="1">⭐ (À améliorer)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Votre Commentaire *</label>
              <textarea
                name="comment"
                required
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                placeholder="Racontez-nous votre séjour face à la Marina de Kribi..."
                class="w-full bg-white border border-gold/20 focus:border-gold focus:outline-none px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              class="w-full bg-ocean hover:bg-ocean/90 text-sand hover:text-white font-bold py-3 rounded-xl text-[11px] tracking-wider uppercase transition-all flex items-center justify-center gap-1 border border-ocean disabled:opacity-50"
            >
              {submitting ? "Enregistrement..." : "Soumettre mon avis"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
