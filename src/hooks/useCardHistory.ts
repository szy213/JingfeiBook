import { supabase } from "../utils/supabase";
import { useAuth } from "../contexts/AuthContext";
import type { LyricCard } from "../types";

export function useCardHistory() {
  const { user } = useAuth();

  const saveCardDraw = async (question: string, card: LyricCard): Promise<void> => {
    if (!user) return;

    const isSecret = card.songTitle === "隐藏";

    const { error } = await supabase.from("card_history").insert({
      user_id: user.id,
      question: question.trim(),
      card_id: card.id,
      card_name: card.cardName,
      song_title: card.songTitle,
      lyrics: card.lyrics,
      is_secret: isSecret,
    });

    if (error) {
      console.warn("Failed to save card history:", error.message);
    }
  };

  const fetchUserCards = async (): Promise<{ card_id: string; card_name: string; is_secret: boolean }[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from("card_history")
      .select("card_id, card_name, is_secret")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Failed to fetch card history:", error.message);
      return [];
    }

    // Deduplicate by card_id and sort by the numeric part
    const seen = new Set<string>();
    const unique: { card_id: string; card_name: string; is_secret: boolean }[] = [];
    for (const row of data) {
      if (!seen.has(row.card_id)) {
        seen.add(row.card_id);
        unique.push(row);
      }
    }

    // Sort by card number extracted from card_id
    unique.sort((a, b) => {
      const numA = parseInt(a.card_id.split("-").pop() || "0", 10);
      const numB = parseInt(b.card_id.split("-").pop() || "0", 10);
      return numA - numB;
    });

    return unique;
  };

  return { saveCardDraw, fetchUserCards };
}
