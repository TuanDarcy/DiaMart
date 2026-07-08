# Delivery Proof Popup UI Plan

## Status

Implemented.

## Purpose

The delivery proof popup should provide subtle, trustworthy social proof once DiaMart has real delivered orders. During development and preview, synthetic sample events may be used only when clearly labeled as demo or sample data. The popup must never present fabricated deliveries as real production activity.

## User Roles

- First-time buyer evaluating marketplace trust.
- Returning buyer checking delivery reliability.
- Mobile buyer who should not be interrupted while shopping.

## User Flow

1. User browses the storefront.
2. After a short delay, a subtle proof popup may appear if proof events are available.
3. Popup shows item name, item category, delivery status, relative time, and anonymized customer identifier.
4. Optional proof image can appear when available.
5. User can dismiss the popup.
6. Popup should not reappear too frequently in the same session.

## Desktop Wireframe

```text
+------------------------------------------------------------+
| Main storefront content                                    |
|                                                            |
|                                                +---------+ |
|                                                | Delivered| |
|                                                | Item name| |
|                                                | Pets     | |
|                                                | 6 min ago| |
|                                                | user A***| |
|                                                | [Dismiss]| |
|                                                +---------+ |
+------------------------------------------------------------+
```

## Mobile Wireframe

```text
+------------------------------+
| Storefront content            |
|                              |
|                              |
| +--------------------------+ |
| | Sample delivery proof    | |
| | Item, category, status   | |
| | [Dismiss]                | |
| +--------------------------+ |
+------------------------------+
```

## Component Tree

```text
DeliveryProofPopup
|- ProofStatusBadge
|- ProofImage optional
|- ProofEventSummary
|- DemoSampleBadge when applicable
|- DismissButton
```

## Reusable Components

- `DeliveryProofPopup`: future storefront-level notification.
- `ProofStatusBadge`: can be reused in delivery proof sections.
- `DemoSampleBadge`: required for non-production sample proof events.

## Important Component Props

```ts
type DeliveryProofPopupProps = {
  event: DeliveryProofEvent;
  isDemo: boolean;
  placement?: "bottom-right" | "bottom";
  onDismiss: () => void;
};

type DeliveryProofEvent = {
  id: string;
  itemName: string;
  itemCategory: "Pets" | "Seeds" | "Gear";
  deliveryStatus: "delivered" | "processing";
  relativeTime: string;
  anonymizedCustomer: string;
  image?: ImageRef;
};

type ImageRef = {
  src: string;
  alt: string;
};
```

## Mock Data Requirements

- 2-4 sample proof events for layout testing only.
- Every synthetic event must include `isDemo: true` in development or preview.
- No real-looking personal information.
- Customer identifiers should be anonymized, such as `Customer A***`.
- Proof images should use local neutral placeholders or original project placeholders only.

## Loading State

- If proof events are unavailable or loading, do not show the popup.
- Do not show a skeleton popup for social proof.

## Empty State

- If no valid proof event exists, the popup should not render.
- The home page delivery proof section may show explanatory copy instead.

## Error State

- If future proof data fails to load, fail silently for the popup.
- Do not show an error toast for missing social proof.
- Log or handle the error outside the UI component when real data exists.

## Success State

- A valid event appears after the recommended delay.
- User can dismiss it.
- Dismissal is respected for the session.
- Demo/sample content is clearly marked in development and preview contexts.
- Entrance motion uses `proof-popup-enter`: the popup starts outside the right edge, slides left into place, and fades in.
- Visible duration includes a progress bar that counts down before dismissal.
- Exit motion uses `proof-popup-exit`: the popup fades out and slides back to the right.
- In the static preview UI, the sample popup appears on a recurring 30-second cadence instead of only once per page load. It remains clearly labeled as sample proof.

## Responsive Behavior

- Desktop: bottom-right placement, above support launcher and away from cart drawer.
- Mobile: bottom placement above persistent navigation or support controls.
- Popup width should stay within viewport padding.
- Popup must not create horizontal overflow.
- Popup must not cover add-to-cart buttons, cart drawer controls, or checkout messaging.

## Accessibility

- Use `role="status"` or another non-disruptive announcement pattern only if it does not become noisy.
- Do not repeatedly announce frequent updates to screen readers.
- Provide a visible dismiss button with accessible label.
- Respect reduced motion preferences.
- Do not auto-focus the popup.
- Text must meet contrast requirements.

## Recommended Timing And Dismissal Behavior

- Initial delay: 12-20 seconds after page load or after the user begins browsing products.
- Frequency: at most one popup per session in the initial UI.
- Minimum interval if multiple events are later supported: 90 seconds or more.
- Dismissal: user dismissal hides the popup for the current session.
- Mobile: delay or suppress the popup while cart drawer, support widget, or mobile navigation is open.
- Urgency: do not use countdowns, rapid animations, or pressure copy.

## Database Impact

No database impact for this UI planning phase.

- Do not create proof tables.
- Do not create migrations.
- Do not connect Supabase.
- Do not connect Supabase Storage.
- Do not define final proof image schema.

## Architecture Impact

No system architecture change for this planning task.

Future proof data should come from a verified order/delivery service, not from presentational UI components.

## Future Integration Notes

- Production proof events must come only from real, successfully delivered orders.
- Proof images will later be uploaded and managed through database and storage systems.
- Usernames and identifiers must be anonymized where appropriate.
- Proof images must not expose private customer details.
- Admin or staff tooling may later manage proof visibility, but that is future scope.

## Files Created Or Modified

Implemented delivery proof popup files:

- `src/features/storefront/components/delivery-proof-popup.tsx`
- `src/features/storefront/mock-data.ts`
- `src/features/storefront/types.ts`

## Testable Acceptance Criteria

- Popup content is English.
- Popup is subtle and non-disruptive.
- Popup never covers important shopping, cart, or support actions.
- Popup is dismissible.
- Popup does not appear repeatedly or too frequently.
- Synthetic sample events are clearly labeled as demo/sample content.
- No personal customer information is shown.
- No fake production delivery proof is presented.
- No Supabase, storage, database, or migration work is introduced.

## Open Questions

- The first implementation includes both the static delivery proof section and a development/preview-only popup. Confirm whether production should enable this only after real proof data exists.
- What proof image style should be used before real uploads exist?
- Which real order status should qualify for public proof display?
- How long should production proof events remain eligible for display?
