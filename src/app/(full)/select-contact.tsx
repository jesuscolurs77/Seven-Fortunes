import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ContactList, type Contact } from "@/components";
import { palette, spacing } from "@/theme";

const FIRST_NAMES = [
  "Ana",
  "Bruno",
  "Carla",
  "Diego",
  "Elena",
  "Fernando",
  "Gabriela",
  "Héctor",
  "Isabel",
  "Jorge",
  "Karla",
  "Luis",
  "María",
  "Néstor",
  "Olga",
];

const LAST_NAMES = [
  "García",
  "Méndez",
  "Rojas",
  "Salas",
  "Pérez",
  "Ríos",
  "Torres",
  "Vargas",
  "Núñez",
  "Castillo",
];

function generateContacts(start: number, count: number): Contact[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = start + i;
    return {
      id: String(idx),
      name: `${FIRST_NAMES[idx % FIRST_NAMES.length]} ${
        LAST_NAMES[idx % LAST_NAMES.length]
      }`,
    };
  });
}

const PAGE_SIZE = 15;
const MAX_PAGES = 4;

export default function SelectContactScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const pageRef = useRef(0);
  const loadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(generateContacts(0, PAGE_SIZE));
      pageRef.current = 1;
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMoreRef.current || !hasMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);

    const nextPage = pageRef.current;
    setTimeout(() => {
      const next = generateContacts(nextPage * PAGE_SIZE, PAGE_SIZE);
      setContacts((prev) => {
        const seen = new Set(prev.map((c) => c.id));
        return [...prev, ...next.filter((c) => !seen.has(c.id))];
      });
      pageRef.current = nextPage + 1;
      const stillHasMore = nextPage + 1 < MAX_PAGES;
      hasMoreRef.current = stillHasMore;
      setHasMore(stillHasMore);
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ContactList
        contacts={contacts}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onSelectContact={(contact) =>
          router.push({
            pathname: "/(full)/send",
            params: { name: contact.name },
          })
        }
        onInvitePress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
    padding: spacing[4],
  },
});
