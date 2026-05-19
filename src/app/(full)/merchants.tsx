import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { MerchantList, type MerchantSection } from "@/components";
import { palette } from "@/theme";

const MERCHANT_SECTIONS: MerchantSection[] = [
  {
    title: "Súpermercados",
    data: [
      {
        id: "plazavea",
        name: "Plaza Vea",
        image: require("../../img/comercios/plazavea.png"),
      },
      {
        id: "vivanda",
        name: "Vivanda",
        image: require("../../img/comercios/vivanda.png"),
      },
      {
        id: "mass",
        name: "Mass",
        image: require("../../img/comercios/mass.png"),
      },
    ],
  },
  {
    title: "Farmacias",
    data: [
      {
        id: "inkafarma",
        name: "Inkafarma",
        image: require("../../img/comercios/cruz-verde.png"),
      },
      {
        id: "mifarma",
        name: "Mifarma",
        image: require("../../img/comercios/cruz_roja.png"),
      },
    ],
  },
  {
    title: "Gastronomía",
    data: [
      {
        id: "bembos",
        name: "Bembos",
        image: require("../../img/comercios/b_azul.png"),
      },
      {
        id: "popeyes",
        name: "Popeyes",
        image: require("../../img/comercios/popeyes.png"),
      },
      {
        id: "china_wok",
        name: "China Wok",
        image: require("../../img/comercios/china_wok.png"),
      },
    ],
  },
  {
    title: "Entretenimiento",
    data: [
      { id: "cineplanet", name: "Cineplanet" },
      { id: "cinemark", name: "Cinemark" },
      { id: "uvk", name: "UVK Multicines" },
    ],
  },
];

export default function MerchantsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const totalCount = useMemo(
    () => MERCHANT_SECTIONS.reduce((acc, s) => acc + s.data.length, 0),
    [],
  );

  return (
    <View style={styles.container}>
      <MerchantList
        sections={MERCHANT_SECTIONS}
        loading={loading}
        searchPlaceholder={`Buscar entre las ${totalCount} tiendas...`}
        onSelectMerchant={(merchant) => {
          router.push({
            pathname: "/(full)/transaction-detail",
            params: { id: merchant.id },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
});
