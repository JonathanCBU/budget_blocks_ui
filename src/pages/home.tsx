import { useEffect, useMemo, useState } from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTags } from "@/hooks/use-tags";
import { Container } from "@/components/common/container";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getItemsByTagAndOrDate } from "@/api/request/items";
import { ApiError } from "@/api/api-client";
import type { Item } from "@/api/dto/item";
import { cn } from "@/lib/utils";

type RangeOption = "7" | "14" | "30" | "custom";

const RANGE_LABELS: Record<RangeOption, string> = {
  "7": "Last 7 days",
  "14": "Last 14 days",
  "30": "Last 30 days",
  custom: "Custom range",
};

export default function Home() {
  const { tags } = useTags();

  const [rangeOption, setRangeOption] = useState<RangeOption>("7");
  const [customStart, setCustomStart] = useState<Date>();
  const [customEnd, setCustomEnd] = useState<Date>();
  const [selectedTagIds, setSelectedTagIds] = useState<Set<number>>(new Set());

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { startDate, endDate } = useMemo(() => {
    if (rangeOption === "custom") {
      return {
        startDate: customStart ? format(customStart, "yyyy-MM-dd") : null,
        endDate: customEnd ? format(customEnd, "yyyy-MM-dd") : null,
      };
    }

    const days = Number(rangeOption);
    const end = new Date();
    const start = subDays(end, days);
    return {
      startDate: format(start, "yyyy-MM-dd"),
      endDate: format(end, "yyyy-MM-dd"),
    };
  }, [rangeOption, customStart, customEnd]);

  function toggleTag(tagId: number) {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  }

  useEffect(() => {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError(null);
    getItemsByTagAndOrDate(startDate, endDate, Array.from(selectedTagIds))
      .then((res) => setItems(res.items))
      .catch((err) =>
        setError(
          err instanceof ApiError ? err.message : "Failed to load items",
        ),
      )
      .finally(() => setLoading(false));
  }, [startDate, endDate, selectedTagIds]);

  const tagTotals = useMemo(() => {
    const totals = new Map<number, number>();
    for (const item of items) {
      totals.set(item.tag_id, (totals.get(item.tag_id) ?? 0) + item.value_c);
    }
    return Array.from(totals.entries()).map(([tagId, valueC]) => ({
      tagId,
      tagName: tags.find((tag) => tag.ID === tagId)?.name ?? `Tag ${tagId}`,
      totalDollars: valueC / 100,
    }));
  }, [items, tags]);

  return (
    <div className="flex min-h-svh w-full flex-col p-8">
      <Container gap={6} className="w-full">
        <Typography type="h1" text="Home" />

        <Container direction="row" gap={4} className="items-center">
          <Select
            value={rangeOption}
            onValueChange={(v) => setRangeOption(v as RangeOption)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue>{RANGE_LABELS[rangeOption]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(RANGE_LABELS) as RangeOption[]).map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {RANGE_LABELS[opt]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {rangeOption === "custom" && (
            <Container direction="row" gap={2} className="items-center">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[160px] justify-start text-left font-normal",
                        !customStart && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <CalendarIcon className="h-4 w-4" />
                  {customStart ? format(customStart, "PPP") : "Start date"}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={customStart}
                    onSelect={setCustomStart}
                  />
                </PopoverContent>
              </Popover>

              <Typography type="muted" text="to" />

              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[160px] justify-start text-left font-normal",
                        !customEnd && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <CalendarIcon className="h-4 w-4" />
                  {customEnd ? format(customEnd, "PPP") : "End date"}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={customEnd}
                    onSelect={setCustomEnd}
                  />
                </PopoverContent>
              </Popover>
            </Container>
          )}
        </Container>

        <Container gap={2}>
          <Typography type="muted" text="Filter by tag" />
          <Container direction="row" gap={2} className="flex-wrap">
            {tags.map((tag) => {
              const isSelected = selectedTagIds.has(tag.ID);
              return (
                <Badge
                  key={tag.ID}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag.ID)}
                >
                  {tag.name}
                </Badge>
              );
            })}
            {selectedTagIds.size > 0 && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedTagIds(new Set())}
              >
                Clear tags
              </Badge>
            )}
          </Container>
        </Container>

        {loading && <Typography type="muted" text="Loading..." />}
        {error && <Typography type="error" text={error} />}
        {rangeOption === "custom" && (!customStart || !customEnd) && (
          <Typography type="muted" text="Pick both a start and end date." />
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <Container gap={2}>
              <Typography type="h3" text="Totals by Tag" />
              <Container gap={2}>
                {tagTotals.map((t) => (
                  <Container
                    key={t.tagId}
                    direction="row"
                    gap={2}
                    className="justify-between border-b pb-1"
                  >
                    <Typography type="p" text={t.tagName} />
                    <Typography
                      type="p"
                      text={`$${t.totalDollars.toFixed(2)}`}
                    />
                  </Container>
                ))}
              </Container>
            </Container>

            <Container gap={2}>
              <Typography type="h3" text="Items" />
              <Container gap={2}>
                {items.map((item) => (
                  <Container
                    key={item.ID}
                    direction="row"
                    gap={2}
                    className="justify-between border-b pb-1"
                  >
                    <Typography type="p" text={item.name} />
                    <Typography
                      type="muted"
                      text={format(new Date(item.date), "PPP")}
                    />
                    <Typography
                      type="p"
                      text={`$${(item.value_c / 100).toFixed(2)}`}
                    />
                  </Container>
                ))}
              </Container>
            </Container>
          </>
        )}

        {!loading && !error && items.length === 0 && (
          <Typography type="muted" text="No items in this date range." />
        )}
      </Container>
    </div>
  );
}
