

export class FakeBackendData {

  private static TIMEZONES_LIST = [
    {
      'timezone': 'Africa/Cairo',
      'GMT': '+02:00'
    },
    {
      'timezone': 'Pacific/Niue',
      'GMT': '-11:00'
    },
    {
      'timezone': 'America/Los_Angeles',
      'GMT': '-08:00'
    },
    {
      'timezone': 'Europe/Zurich',
      'GMT': '+02:00'
    },
    {
      'timezone': 'Pacific/Fiji',
      'GMT': '+12:00'
    },
    {
      'timezone': 'Indian/Maldives',
      'GMT': '+05:00'
    },
    {
      'timezone': 'Asia/Tehran',
      'GMT':  '+03:30'
    },
    {
      'timezone': 'America/La_Paz',
      'GMT': '-04:00'
    },
    {
      'timezone': 'Asia/Tbilisi',
      'GMT': '+04:00'
    },
    {
      'timezone': 'America/Noronha',
      'GMT': '-02:00'
    },
    {
      'timezone': 'Antarctica/DumontDUrville',
      'GMT': '+10:00'
    },
    {
      'timezone': 'Hawaiian Standard Time',
      'GMT': '-10:00'
    }
  ];

  public static timezonesGMT() {

    return this.TIMEZONES_LIST;
  }
}
