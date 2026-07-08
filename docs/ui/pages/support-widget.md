# Support Widget UI Plan

## Status

Implemented.

## Purpose

The support widget should give buyers immediate, calm access to help while making Discord the primary escalation channel. During the initial UI phase it is a planned interface only: no real bot, no live chat backend, no Discord API integration, and no ticket creation.

## User Roles

- Buyer who needs help choosing an item.
- Buyer who has a delivery question.
- Buyer who has a cart or checkout-preview question.
- Returning buyer looking for Discord support.

## User Flow

1. User opens the support widget from a floating button, header link, or support section.
2. Widget displays common troubleshooting options in English.
3. User selects a topic such as delivery timing, item availability, cart preview, refund expectations, or Discord support.
4. The mock bot-style UI shows safe static guidance.
5. If unresolved, user sees a `Continue on Discord` action.
6. User can also message the admin directly through Telegram at `@tuandarcy`.
7. Future implementation may create or direct to a Discord ticket.

## Desktop Wireframe

```text
+------------------------------------------+
| Floating support button                  |
+------------------------------------------+

When opened:
+------------------------------------------+
| DiaMart Support                    [X]   |
| Discord-first support                    |
+------------------------------------------+
| How can we help?                         |
| [Delivery timing]                        |
| [Item availability]                      |
| [Cart or checkout preview]               |
| [Refund or issue resolution]             |
+------------------------------------------+
| Static guidance / mock response          |
+------------------------------------------+
| [Continue on Discord] [View FAQ]         |
+------------------------------------------+
```

## Mobile Wireframe

```text
+------------------------------+
| Support button bottom-right   |
+------------------------------+

When opened:
+------------------------------+
| DiaMart Support          [X]  |
| Discord-first help            |
+------------------------------+
| Topic buttons stacked         |
+------------------------------+
| Guidance text                 |
+------------------------------+
| [Continue on Discord]         |
| [View FAQ]                    |
+------------------------------+
```

## Component Tree

```text
SupportWidget
|- SupportLauncherButton
|- SupportPanel
|  |- SupportTopicList
|  |- SupportMockResponse
|  |- DiscordSupportAction
|  |- SupportFooterLinks
|- SupportBackdrop optional on mobile
```

## Reusable Components

- `SupportLauncherButton`: can appear globally.
- `SupportPanel`: reusable support surface.
- `SupportTopicList`: reusable for FAQ or support routing.
- `DiscordSupportAction`: shared Discord escalation CTA.

## Important Component Props

```ts
type SupportWidgetProps = {
  topics: SupportTopic[];
  discordHref?: string;
  mode: "mock" | "disabled" | "live-planned";
};

type SupportTopic = {
  id: string;
  label: string;
  description: string;
  response: string;
};

type DiscordSupportActionProps = {
  href?: string;
  disabled: boolean;
  helperText: string;
};
```

## Mock Data Requirements

- 4-6 support topics.
- Static response text for each topic.
- Discord CTA content.
- Telegram admin CTA content.
- Optional disabled state if no Discord URL is confirmed.

Mock content must be English and must not claim that a real agent or real ticket has been created.

## Loading State

- Initial mock UI should not need loading.
- If future remote support config is introduced, show a compact loading message inside the panel.

## Empty State

- If no topics are configured, show `Support topics are being prepared.`
- Keep a Discord support action visible if a confirmed URL exists.

## Error State

- If a future support integration fails, show `Support could not be opened here. Please continue on Discord.`
- Do not trap the user inside a broken chat UI.

## Success State

- Selecting a topic shows relevant static guidance.
- Selecting `Continue on Discord` opens the confirmed Discord destination when available.
- Selecting `Message @tuandarcy` opens Telegram direct support.
- If the Discord URL is not yet configured, the action should be disabled with clear helper text.

## Responsive Behavior

- Desktop: small floating panel anchored near the lower-right corner.
- Mobile: bottom sheet or centered panel that does not cover the cart button permanently.
- The launcher should not cover primary product actions or the cart drawer.
- Touch targets should be at least 44px where practical.

## Accessibility

- Launcher button requires an accessible label, such as `Open support`.
- Panel should use dialog semantics if it overlays the page.
- Focus should move into the panel when opened and return to the launcher when closed.
- Escape key and close button should dismiss the panel.
- Topic buttons must be keyboard accessible.
- Do not rely on color alone to indicate selected topic.

## Database Impact

No database impact.

- Do not create tables.
- Do not create migrations.
- Do not store conversation state.
- Do not connect Supabase.

## Architecture Impact

No system architecture change for this planning task.

Future support integrations should be designed separately and should keep API calls outside presentational UI components.

## Future Integration Notes

- Real Discord ticket creation requires Discord API or bot integration.
- Future live chat may require conversation state, agent assignment, staff dashboard, and ticket synchronization.
- Support escalation should preserve user privacy and avoid exposing order details in public channels.

## Files Created Or Modified

Implemented support widget files:

- `src/features/storefront/components/support-widget.tsx`
- `src/features/storefront/mock-data.ts`
- `src/features/storefront/types.ts`
- `src/config/site.ts`

## Testable Acceptance Criteria

- Widget copy is English.
- Discord is clearly presented as the primary escalation channel.
- No real bot behavior is implied during the mock UI phase.
- No real ticket is created.
- Widget can be opened and dismissed.
- Widget does not cover important shopping actions.
- Mobile layout has no whole-page horizontal overflow.
- The Discord action is disabled or clearly marked if no URL is configured.

## Open Questions

- What is the confirmed Discord URL?
- Should the widget be global on every storefront page or only on shopping/support pages?
- Which support topics should be prioritized for launch?
- Should users be asked for order details before Discord integration exists, or should that wait for real support tooling?
