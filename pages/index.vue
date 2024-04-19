<script setup lang="ts">
import floraforms from "../floraforms.json";
import { checkSiblings } from "../utils/checkSiblings";
import { getSeed } from "../utils/getSeed";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const { data } = useFetch(
  "https://api-mainnet.magiceden.dev/v2/ord/btc/tokens?collectionSymbol=floraforms-by-harto&sortBy=priceAsc",
  {
    headers: {
      Authorization: `Bearer ${process.env.MAGICEDEN_API_KEY}`,
    },
  },
);
const tokens = ref([]);
watchEffect(() => {
  if (data.value) {
    tokens.value = data.value.tokens.map((token) => {
      const rankToken = floraforms.find((item) => item.id === token.id);
      token.rank = rankToken.rank;
      return token;
    });
  }
});

const { data: recentlyListed } = await useFetch(
  "https://api-mainnet.magiceden.dev/v2/ord/btc/tokens?collectionSymbol=floraforms-by-harto&sortBy=listedAtDesc",
  {
    headers: {
      Authorization: `Bearer ${process.env.MAGICEDEN_API_KEY}`,
    },
  },
);
const recentlyListedTokens = ref([]);
watchEffect(() => {
  if (recentlyListed.value) {
    recentlyListedTokens.value = recentlyListed.value.tokens.map((token) => {
      const rankToken = floraforms.find((item) => item.id === token.id);
      token.rank = rankToken.rank;
      return token;
    });
  }
});
const recentlyListedTwins = recentlyListedTokens.value.filter(
  (token) => checkSiblings(token.displayName) == 2,
);
const recentlyListedTriplets = recentlyListedTokens.value.filter(
  (token) => checkSiblings(token.displayName) == 3,
);
const recentlyListedQuadruplets = recentlyListedTokens.value.filter(
  (token) => checkSiblings(token.displayName) == 4,
);
const getSiblingClass = (name: string) => {
  const siblings = checkSiblings(name);
  if (siblings === 2) return "bg-green-950";
  if (siblings === 3) return "bg-red-950";
  if (siblings === 4) return "bg-blue-950";
  return "";
};
</script>
<template>
  <ThemeToggle></ThemeToggle>

  <div v-if="tokens && recentlyListedTokens" class="flex gap-8">
    <div class="flex flex-col w-1/3">
      Price ascending
      <Table>
        <TableCaption>Floraforms sorted by price ascending</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Siblings</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Seed</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="token in tokens">
            <TableCell>
              {{ token.displayName }}
            </TableCell>
            <TableCell>{{
              (token.listedPrice / 100000000).toFixed(8)
            }}</TableCell>
            <TableCell>
              <span
                :class="`${getSiblingClass(
                  token.displayName,
                )} py-2 px-2 font-bold`"
              >
                {{ checkSiblings(token.displayName) }}
              </span>
            </TableCell>
            <TableCell>{{ token.rank }}</TableCell>
            <TableCell>{{ getSeed(token.displayName) }}</TableCell>
            <TableCell>
              <NuxtLink
                :to="`https://magiceden.io/ordinals/item-details/${token.id}`"
                target="_blank"
              >
                Link
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex flex-col w-1/3">
      Listing date
      <Table>
        <TableCaption>Floraforms sorted by listing date</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Siblings</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Seed</TableHead>
            <TableHead>Listed at</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="token in recentlyListedTokens">
            <TableCell>
              {{ token.displayName }}
            </TableCell>
            <TableCell>{{
              (token.listedPrice / 100000000).toFixed(8)
            }}</TableCell>
            <TableCell>
              <span
                :class="`${getSiblingClass(
                  token.displayName,
                )} py-2 px-2 font-bold`"
              >
                {{ checkSiblings(token.displayName) }}
              </span>
            </TableCell>
            <TableCell>{{ token.rank }}</TableCell>
            <TableCell>{{ getSeed(token.displayName) }}</TableCell>
            <TableCell>{{ token.listedAt }}</TableCell>
            <TableCell>
              <NuxtLink
                :to="`https://magiceden.io/ordinals/item-details/${token.id}`"
                target="_blank"
              >
                Link
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex flex-col w-1/3 gap-8">
      <div>
        Recently listed twins
        <Table>
          <TableCaption>Recently listed floraforms twins</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Siblings</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Seed</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="token in recentlyListedTwins">
              <TableCell>
                {{ token.displayName }}
              </TableCell>
              <TableCell>{{
                (token.listedPrice / 100000000).toFixed(8)
              }}</TableCell>
              <TableCell>
                <span
                  :class="`${getSiblingClass(
                    token.displayName,
                  )} py-2 px-2 font-bold`"
                >
                  {{ checkSiblings(token.displayName) }}
                </span>
              </TableCell>
              <TableCell>{{ token.rank }}</TableCell>
              <TableCell>{{ getSeed(token.displayName) }}</TableCell>
              <TableCell>
                <NuxtLink
                  :to="`https://magiceden.io/ordinals/item-details/${token.id}`"
                  target="_blank"
                >
                  Link
                </NuxtLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        Recently listed triplets
        <Table>
          <TableCaption>Recently listed floraforms triplets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Siblings</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Seed</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="token in recentlyListedTriplets">
              <TableCell>
                {{ token.displayName }}
              </TableCell>
              <TableCell>{{
                (token.listedPrice / 100000000).toFixed(8)
              }}</TableCell>
              <TableCell>
                <span
                  :class="`${getSiblingClass(
                    token.displayName,
                  )} py-2 px-2 font-bold`"
                >
                  {{ checkSiblings(token.displayName) }}
                </span>
              </TableCell>
              <TableCell>{{ token.rank }}</TableCell>
              <TableCell>{{ getSeed(token.displayName) }}</TableCell>
              <TableCell>
                <NuxtLink
                  :to="`https://magiceden.io/ordinals/item-details/${token.id}`"
                  target="_blank"
                >
                  Link
                </NuxtLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        Recently listed quadruplets
        <Table>
          <TableCaption>Recently listed floraforms quadruplets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Siblings</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Seed</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="token in recentlyListedQuadruplets">
              <TableCell>
                {{ token.displayName }}
              </TableCell>
              <TableCell>{{
                (token.listedPrice / 100000000).toFixed(8)
              }}</TableCell>
              <TableCell>
                <span
                  :class="`${getSiblingClass(
                    token.displayName,
                  )} py-2 px-2 font-bold`"
                >
                  {{ checkSiblings(token.displayName) }}
                </span>
              </TableCell>
              <TableCell>{{ token.rank }}</TableCell>
              <TableCell>{{ getSeed(token.displayName) }}</TableCell>
              <TableCell>
                <NuxtLink
                  :to="`https://magiceden.io/ordinals/item-details/${token.id}`"
                  target="_blank"
                >
                  Link
                </NuxtLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
