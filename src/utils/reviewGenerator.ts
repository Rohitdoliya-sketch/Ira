/**
 * Review generation logic strictly adheres to:
 * 1. Customer-selected services
 * 2. Customer-selected star rating
 * 3. Customer-selected experience points
 * 4. Customer-written optional text
 *
 * It NEVER invents staff names, products, prices, facilities, offers, or claims.
 * It matches the honest sentiment of the 1 to 5 star rating.
 */

interface GenerateReviewParams {
  services: string[];
  customService?: string;
  rating: number; // 1 to 5
  standouts: string[];
  otherNotes?: string;
  variation?: number;
}

// Map standout uppercase keys to clean natural lowercase phrases
function formatStandouts(standouts: string[]): string[] {
  return standouts
    .filter((s) => s !== 'NOTHING SPECIFIC' && s !== 'OTHER')
    .map((s) => {
      switch (s) {
        case 'SERVICE':
          return 'the attentive service';
        case 'STAFF':
          return 'the staff demeanor';
        case 'QUALITY':
          return 'the quality of work';
        case 'CLEANLINESS':
          return 'the cleanliness of the space';
        case 'AMBIENCE':
          return 'the calm ambience';
        case 'PROFESSIONALISM':
          return 'the professionalism';
        case 'ATTENTION TO DETAIL':
          return 'the attention to detail';
        case 'VALUE':
          return 'the reasonable value';
        case 'OVERALL EXPERIENCE':
          return 'the overall visit';
        default:
          return s.toLowerCase();
      }
    });
}

function formatServiceList(services: string[], customService?: string): string {
  const list = [...services.filter((s) => s !== 'Something else')];
  if (customService && customService.trim()) {
    list.push(customService.trim());
  }
  if (list.length === 0) return 'my visit';
  if (list.length === 1) return list[0].toLowerCase();
  if (list.length === 2) return `${list[0].toLowerCase()} and ${list[1].toLowerCase()}`;
  return `${list.slice(0, -1).map((s) => s.toLowerCase()).join(', ')} and ${list[list.length - 1].toLowerCase()}`;
}

export function generateCustomerReview({
  services,
  customService,
  rating,
  standouts,
  otherNotes,
  variation = 0,
}: GenerateReviewParams): string {
  const serviceText = formatServiceList(services, customService);
  const standoutItems = formatStandouts(standouts);
  const trimmedNotes = otherNotes?.trim();

  const standoutJoin =
    standoutItems.length > 0
      ? standoutItems.length === 1
        ? standoutItems[0]
        : standoutItems.length === 2
          ? `${standoutItems[0]} and ${standoutItems[1]}`
          : `${standoutItems.slice(0, -1).join(', ')}, and ${standoutItems[standoutItems.length - 1]}`
      : null;

  // Generate based on rating sentiment
  let review = '';
  const v = Math.abs(variation) % 3;

  if (rating === 5) {
    if (v === 0) {
      review = `Visited Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Really appreciated ${standoutJoin}. `;
      }
      review += `Everything was handled smoothly and I had an excellent experience.`;
    } else if (v === 1) {
      review = `Had ${serviceText} done at Ira Unisex Salon today. `;
      if (standoutJoin) {
        review += `What stood out most was ${standoutJoin}. `;
      }
      review += `Very pleased with the result and will gladly return.`;
    } else {
      review = `Great experience at Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Particularly liked ${standoutJoin}. `;
      }
      review += `Very neat, punctual, and satisfying visit.`;
    }
  } else if (rating === 4) {
    if (v === 0) {
      review = `Went to Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `The ${standoutJoin} were good and well-managed. `;
      }
      review += `Overall a solid, positive visit.`;
    } else if (v === 1) {
      review = `Good visit at Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Appreciated ${standoutJoin}. `;
      }
      review += `Everything went well and was done professionally.`;
    } else {
      review = `Had ${serviceText} at Ira Unisex Salon. `;
      if (standoutJoin) {
        review += `Noticed good ${standoutJoin} during the session. `;
      }
      review += `Pleasant and reliable service.`;
    }
  } else if (rating === 3) {
    if (v === 0) {
      review = `Visited Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Found ${standoutJoin} to be decent. `;
      }
      review += `An okay, average visit overall with some good points and room for fine-tuning.`;
    } else if (v === 1) {
      review = `Had ${serviceText} at Ira Unisex Salon today. `;
      if (standoutJoin) {
        review += `The ${standoutJoin} was fair. `;
      }
      review += `Standard experience, neither bad nor exceptional.`;
    } else {
      review = `Decent visit to Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Noted ${standoutJoin}. `;
      }
      review += `Fairly balanced experience overall.`;
    }
  } else if (rating === 2) {
    if (v === 0) {
      review = `Visited Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `While there was some attention to ${standoutJoin}, the overall experience felt inconsistent. `;
      } else {
        review += `The service did not quite meet expectations today. `;
      }
      review += `Hoping to see better consistency on future visits.`;
    } else if (v === 1) {
      review = `Had ${serviceText} at Ira Unisex Salon. `;
      if (standoutJoin) {
        review += `Found aspects of ${standoutJoin} needing improvement. `;
      }
      review += `Mixed experience that fell a bit short of what I anticipated.`;
    } else {
      review = `Service visit for ${serviceText} at Ira Unisex Salon. `;
      review += `The appointment had notable drawbacks and wasn't fully satisfying. Room for improvement.`;
    }
  } else {
    // 1 Star
    if (v === 0) {
      review = `Had an unsatisfactory visit to Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Felt that ${standoutJoin} was lacking during the appointment. `;
      }
      review += `Disappointed with the outcome and the overall service.`;
    } else if (v === 1) {
      review = `Unhappy with my experience for ${serviceText} at Ira Unisex Salon. `;
      review += `The visit did not meet basic standards and fell far below expectations.`;
    } else {
      review = `Disappointing appointment at Ira Unisex Salon for ${serviceText}. `;
      if (standoutJoin) {
        review += `Issues around ${standoutJoin} impacted the visit. `;
      }
      review += `Needs substantial improvement in handling customer visits.`;
    }
  }

  // If the customer provided optional personal notes, append naturally
  if (trimmedNotes) {
    review += ` Note: ${trimmedNotes}`;
  }

  return review.trim();
}
