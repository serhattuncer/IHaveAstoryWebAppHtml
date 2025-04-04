let following = false;
let extMenuActive = false;

const stats = {
  followerCount: 56799,
  followingCount: 243,
  likeCount: 4225246,
}

const numCommasToUnit = (numCommas) => {
  switch (numCommas) {
    case 0:
      return '';
    case 1:
      return 'K';
    case 2:
      return 'M';
    case 3:
      return 'B';
    case 4:
      return 'T';
    default:
      return '';
  }
}

const prettifyStat = (num) => {
  const asInt = parseInt(num);//ensure stat isn't a float
  const asStr = asInt.toString();
  const numDigits = asStr.length;
  const numCommas = parseInt((numDigits - 1) / 3);
  const dotIndex = ((numDigits - 1) % 3) + 1;
  if (numDigits > 3) {
    const unit = numCommasToUnit(numCommas);
    return `${asStr.slice(0, dotIndex)}.${asStr.slice(dotIndex, 3)}${unit}`;
  }
  return num;
}

const renderFollowing = () => {
  if (following) {
    $("#following").addClass("following");
  } else {
    $("#following").removeClass("following");
  }
}

const renderStats = () => {
  for (const key in stats) {
    $(`#${key}`).text(prettifyStat(stats[key]));
  }
}

$("body").on("click", "#following", function() {
  following = !following;
  if (following) {
    stats['followerCount'] += 1;
  } else {
    stats['followerCount'] -= 1;
  }
  renderFollowing();
  renderStats();
});

$("body").on("click", ".profile-tab:not(.selected)", function() {
  $(".profile-tab").removeClass("selected");
  $(this).addClass("selected");
});

$("body").on("click", ".follow-ext, .follow-ext-menu-item", function() {
  extMenuActive = !extMenuActive;
  if (extMenuActive) {
    $(".follow-ext-menu").slideDown(200);
  } else {
    $(".follow-ext-menu").slideUp(200);
  }
});

renderStats();