!function() {
    var e = {
        87322: function(e) {
            e.exports = function() {
                "use strict";
                var e = "millisecond"
                  , t = "second"
                  , n = "minute"
                  , i = "hour"
                  , r = "day"
                  , s = "week"
                  , o = "month"
                  , a = "quarter"
                  , c = "year"
                  , u = "date"
                  , d = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/
                  , l = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
                  , h = {
                    name: "en",
                    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                }
                  , p = function(e, t, n) {
                    var i = String(e);
                    return !i || i.length >= t ? e : "" + Array(t + 1 - i.length).join(n) + e
                }
                  , w = {
                    s: p,
                    z: function(e) {
                        var t = -e.utcOffset()
                          , n = Math.abs(t)
                          , i = Math.floor(n / 60)
                          , r = n % 60;
                        return (t <= 0 ? "+" : "-") + p(i, 2, "0") + ":" + p(r, 2, "0")
                    },
                    m: function e(t, n) {
                        if (t.date() < n.date())
                            return -e(n, t);
                        var i = 12 * (n.year() - t.year()) + (n.month() - t.month())
                          , r = t.clone().add(i, o)
                          , s = n - r < 0
                          , a = t.clone().add(i + (s ? -1 : 1), o);
                        return +(-(i + (n - r) / (s ? r - a : a - r)) || 0)
                    },
                    a: function(e) {
                        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
                    },
                    p: function(d) {
                        return {
                            M: o,
                            y: c,
                            w: s,
                            d: r,
                            D: u,
                            h: i,
                            m: n,
                            s: t,
                            ms: e,
                            Q: a
                        }[d] || String(d || "").toLowerCase().replace(/s$/, "")
                    },
                    u: function(e) {
                        return void 0 === e
                    }
                }
                  , f = "en"
                  , g = {};
                g[f] = h;
                var m = function(e) {
                    return e instanceof C
                }
                  , S = function(e, t, n) {
                    var i;
                    if (!e)
                        return f;
                    if ("string" == typeof e)
                        g[e] && (i = e),
                        t && (g[e] = t,
                        i = e);
                    else {
                        var r = e.name;
                        g[r] = e,
                        i = r
                    }
                    return !n && i && (f = i),
                    i || !n && f
                }
                  , y = function(e, t) {
                    if (m(e))
                        return e.clone();
                    var n = "object" == typeof t ? t : {};
                    return n.date = e,
                    n.args = arguments,
                    new C(n)
                }
                  , v = w;
                v.l = S,
                v.i = m,
                v.w = function(e, t) {
                    return y(e, {
                        locale: t.$L,
                        utc: t.$u,
                        x: t.$x,
                        $offset: t.$offset
                    })
                }
                ;
                var C = function() {
                    function h(e) {
                        this.$L = S(e.locale, null, !0),
                        this.parse(e)
                    }
                    var p = h.prototype;
                    return p.parse = function(e) {
                        this.$d = function(e) {
                            var t = e.date
                              , n = e.utc;
                            if (null === t)
                                return new Date(NaN);
                            if (v.u(t))
                                return new Date;
                            if (t instanceof Date)
                                return new Date(t);
                            if ("string" == typeof t && !/Z$/i.test(t)) {
                                var i = t.match(d);
                                if (i) {
                                    var r = i[2] - 1 || 0
                                      , s = (i[7] || "0").substring(0, 3);
                                    return n ? new Date(Date.UTC(i[1], r, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, s)) : new Date(i[1],r,i[3] || 1,i[4] || 0,i[5] || 0,i[6] || 0,s)
                                }
                            }
                            return new Date(t)
                        }(e),
                        this.$x = e.x || {},
                        this.init()
                    }
                    ,
                    p.init = function() {
                        var e = this.$d;
                        this.$y = e.getFullYear(),
                        this.$M = e.getMonth(),
                        this.$D = e.getDate(),
                        this.$W = e.getDay(),
                        this.$H = e.getHours(),
                        this.$m = e.getMinutes(),
                        this.$s = e.getSeconds(),
                        this.$ms = e.getMilliseconds()
                    }
                    ,
                    p.$utils = function() {
                        return v
                    }
                    ,
                    p.isValid = function() {
                        return !("Invalid Date" === this.$d.toString())
                    }
                    ,
                    p.isSame = function(e, t) {
                        var n = y(e);
                        return this.startOf(t) <= n && n <= this.endOf(t)
                    }
                    ,
                    p.isAfter = function(e, t) {
                        return y(e) < this.startOf(t)
                    }
                    ,
                    p.isBefore = function(e, t) {
                        return this.endOf(t) < y(e)
                    }
                    ,
                    p.$g = function(e, t, n) {
                        return v.u(e) ? this[t] : this.set(n, e)
                    }
                    ,
                    p.unix = function() {
                        return Math.floor(this.valueOf() / 1e3)
                    }
                    ,
                    p.valueOf = function() {
                        return this.$d.getTime()
                    }
                    ,
                    p.startOf = function(e, a) {
                        var d = this
                          , l = !!v.u(a) || a
                          , h = v.p(e)
                          , p = function(e, t) {
                            var n = v.w(d.$u ? Date.UTC(d.$y, t, e) : new Date(d.$y,t,e), d);
                            return l ? n : n.endOf(r)
                        }
                          , w = function(e, t) {
                            return v.w(d.toDate()[e].apply(d.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), d)
                        }
                          , f = this.$W
                          , g = this.$M
                          , m = this.$D
                          , S = "set" + (this.$u ? "UTC" : "");
                        switch (h) {
                        case c:
                            return l ? p(1, 0) : p(31, 11);
                        case o:
                            return l ? p(1, g) : p(0, g + 1);
                        case s:
                            var y = this.$locale().weekStart || 0
                              , C = (f < y ? f + 7 : f) - y;
                            return p(l ? m - C : m + (6 - C), g);
                        case r:
                        case u:
                            return w(S + "Hours", 0);
                        case i:
                            return w(S + "Minutes", 1);
                        case n:
                            return w(S + "Seconds", 2);
                        case t:
                            return w(S + "Milliseconds", 3);
                        default:
                            return this.clone()
                        }
                    }
                    ,
                    p.endOf = function(e) {
                        return this.startOf(e, !1)
                    }
                    ,
                    p.$set = function(s, a) {
                        var d, l = v.p(s), h = "set" + (this.$u ? "UTC" : ""), p = (d = {},
                        d[r] = h + "Date",
                        d[u] = h + "Date",
                        d[o] = h + "Month",
                        d[c] = h + "FullYear",
                        d[i] = h + "Hours",
                        d[n] = h + "Minutes",
                        d[t] = h + "Seconds",
                        d[e] = h + "Milliseconds",
                        d)[l], w = l === r ? this.$D + (a - this.$W) : a;
                        if (l === o || l === c) {
                            var f = this.clone().set(u, 1);
                            f.$d[p](w),
                            f.init(),
                            this.$d = f.set(u, Math.min(this.$D, f.daysInMonth())).$d
                        } else
                            p && this.$d[p](w);
                        return this.init(),
                        this
                    }
                    ,
                    p.set = function(e, t) {
                        return this.clone().$set(e, t)
                    }
                    ,
                    p.get = function(e) {
                        return this[v.p(e)]()
                    }
                    ,
                    p.add = function(e, a) {
                        var u, d = this;
                        e = Number(e);
                        var l = v.p(a)
                          , h = function(t) {
                            var n = y(d);
                            return v.w(n.date(n.date() + Math.round(t * e)), d)
                        };
                        if (l === o)
                            return this.set(o, this.$M + e);
                        if (l === c)
                            return this.set(c, this.$y + e);
                        if (l === r)
                            return h(1);
                        if (l === s)
                            return h(7);
                        var p = (u = {},
                        u[n] = 6e4,
                        u[i] = 36e5,
                        u[t] = 1e3,
                        u)[l] || 1
                          , w = this.$d.getTime() + e * p;
                        return v.w(w, this)
                    }
                    ,
                    p.subtract = function(e, t) {
                        return this.add(-1 * e, t)
                    }
                    ,
                    p.format = function(e) {
                        var t = this;
                        if (!this.isValid())
                            return "Invalid Date";
                        var n = e || "YYYY-MM-DDTHH:mm:ssZ"
                          , i = v.z(this)
                          , r = this.$locale()
                          , s = this.$H
                          , o = this.$m
                          , a = this.$M
                          , c = r.weekdays
                          , u = r.months
                          , d = function(e, i, r, s) {
                            return e && (e[i] || e(t, n)) || r[i].substr(0, s)
                        }
                          , h = function(e) {
                            return v.s(s % 12 || 12, e, "0")
                        }
                          , p = r.meridiem || function(e, t, n) {
                            var i = e < 12 ? "AM" : "PM";
                            return n ? i.toLowerCase() : i
                        }
                          , w = {
                            YY: String(this.$y).slice(-2),
                            YYYY: this.$y,
                            M: a + 1,
                            MM: v.s(a + 1, 2, "0"),
                            MMM: d(r.monthsShort, a, u, 3),
                            MMMM: d(u, a),
                            D: this.$D,
                            DD: v.s(this.$D, 2, "0"),
                            d: String(this.$W),
                            dd: d(r.weekdaysMin, this.$W, c, 2),
                            ddd: d(r.weekdaysShort, this.$W, c, 3),
                            dddd: c[this.$W],
                            H: String(s),
                            HH: v.s(s, 2, "0"),
                            h: h(1),
                            hh: h(2),
                            a: p(s, o, !0),
                            A: p(s, o, !1),
                            m: String(o),
                            mm: v.s(o, 2, "0"),
                            s: String(this.$s),
                            ss: v.s(this.$s, 2, "0"),
                            SSS: v.s(this.$ms, 3, "0"),
                            Z: i
                        };
                        return n.replace(l, (function(e, t) {
                            return t || w[e] || i.replace(":", "")
                        }
                        ))
                    }
                    ,
                    p.utcOffset = function() {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                    }
                    ,
                    p.diff = function(e, u, d) {
                        var l, h = v.p(u), p = y(e), w = 6e4 * (p.utcOffset() - this.utcOffset()), f = this - p, g = v.m(this, p);
                        return g = (l = {},
                        l[c] = g / 12,
                        l[o] = g,
                        l[a] = g / 3,
                        l[s] = (f - w) / 6048e5,
                        l[r] = (f - w) / 864e5,
                        l[i] = f / 36e5,
                        l[n] = f / 6e4,
                        l[t] = f / 1e3,
                        l)[h] || f,
                        d ? g : v.a(g)
                    }
                    ,
                    p.daysInMonth = function() {
                        return this.endOf(o).$D
                    }
                    ,
                    p.$locale = function() {
                        return g[this.$L]
                    }
                    ,
                    p.locale = function(e, t) {
                        if (!e)
                            return this.$L;
                        var n = this.clone()
                          , i = S(e, t, !0);
                        return i && (n.$L = i),
                        n
                    }
                    ,
                    p.clone = function() {
                        return v.w(this.$d, this)
                    }
                    ,
                    p.toDate = function() {
                        return new Date(this.valueOf())
                    }
                    ,
                    p.toJSON = function() {
                        return this.isValid() ? this.toISOString() : null
                    }
                    ,
                    p.toISOString = function() {
                        return this.$d.toISOString()
                    }
                    ,
                    p.toString = function() {
                        return this.$d.toUTCString()
                    }
                    ,
                    h
                }()
                  , N = C.prototype;
                return y.prototype = N,
                [["$ms", e], ["$s", t], ["$m", n], ["$H", i], ["$W", r], ["$M", o], ["$y", c], ["$D", u]].forEach((function(e) {
                    N[e[1]] = function(t) {
                        return this.$g(t, e[0], e[1])
                    }
                }
                )),
                y.extend = function(e, t) {
                    return e.$i || (e(t, C, y),
                    e.$i = !0),
                    y
                }
                ,
                y.locale = S,
                y.isDayjs = m,
                y.unix = function(e) {
                    return y(1e3 * e)
                }
                ,
                y.en = g[f],
                y.Ls = g,
                y.p = {},
                y
            }()
        }
    }
      , t = {};
    function n(i) {
        var r = t[i];
        if (void 0 !== r)
            return r.exports;
        var s = t[i] = {
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, n),
        s.exports
    }
    n.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    function() {
        {
            const e = n.e
              , t = {};
            n.e = function(i) {
                return e(i).catch((function(e) {
                    const r = t.hasOwnProperty(i) ? t[i] : 2;
                    if (r < 1)
                        throw e;
                    return new Promise((function(e) {
                        setTimeout((function() {
                            t[i] = r - 1,
                            e(n.e(i))
                        }
                        ), 100)
                    }
                    ))
                }
                ))
            }
        }
    }(),
    function() {
        "use strict";
        function e(e, t, n, i) {
            return new (n || (n = Promise))((function(r, s) {
                function o(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        s(e)
                    }
                }
                function a(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(o, a)
                }
                c((i = i.apply(e, t || [])).next())
            }
            ))
        }
        Object.create;
        var t, i, r, s, o, a, c, u, d, l, h, p, w, f;
        Object.create;
        !function(e) {
            e.msnews = "msnews",
            e.entnewsntp = "entnewsntp",
            e.msedgdhp = "msedgdhp",
            e.msedgntp = "msedgntp",
            e.chromentpnews = "chromentpnews"
        }(t || (t = {})),
        function(e) {
            e.Stock = "Stock",
            e.L3_Ownership = "L3_Ownership",
            e.L3_Earnings = "L3_Earnings",
            e.L3_Sentiment = "L3_Sentiment",
            e.Index_L3_Sentiment = "Index_L3_Sentiment",
            e.Crypto_L3_Sentiment = "Crypto_L3_Sentiment",
            e.L3_Grades = "L3_Grades",
            e.L3_Financials = "L3_Financials",
            e.L3_History = "L3_History",
            e.L3_Options = "L3_Options",
            e.L3_Related = "L3_Related",
            e.Index_L3_Related = "Index_L3_Related",
            e.L3_Company = "L3_Company",
            e.L3_Analysis = "L3_Analysis",
            e.L3_Events = "L3_Events",
            e.Index = "Index",
            e.ETF = "ETF",
            e.ETF_L3_Ownership = "ETF_L3_Ownership",
            e.ETF_L3_Holdings = "ETF_L3_Holdings",
            e.Fund = "Fund",
            e.Fund_L3_Ownership = "Fund_L3_Ownership",
            e.Fund_L3_Holdings = "Fund_L3_Holdings",
            e.Commodity = "Commodity",
            e.Commodity_L3_Ownership = "Commodity_L3_Ownership",
            e.Currency = "Currency",
            e.CryptocurrencyLanding = "CryptocurrencyLanding",
            e.Cryptocurrency = "Cryptocurrency",
            e.Watchlist = "Watchlist",
            e.WatchlistSummary = "WatchlistSummary",
            e.WatchlistJourney = "WatchlistJourney",
            e.Markets = "Markets",
            e.MarketsOfFunds = "Markets_Funds",
            e.MarketsOfETFs = "Markets_ETFs",
            e.DetailOfCollection = "DetailOfCollection",
            e.Landing = "Landing",
            e.Learn_Cryptocurrencies = "Learn_Cryptocurrencies",
            e.Discover = "Discover",
            e.InvestorDetails = "InvestorDetails",
            e.ListDetails = "ListDetails",
            e.ListOverview = "ListOverview",
            e.MyLists = "MyLists",
            e.InvestingNews = "InvestingNews",
            e.CompaniesNews = "CompaniesNews",
            e.CompanyNews = "CompanyNews",
            e.TopStocksNews = "TopStocksNews",
            e.PersonalFinanceNews = "PersonalFinanceNews",
            e.SpendingNews = "SpendingNews",
            e.RetirementNews = "RetirementNews",
            e.CreditNews = "CreditNews",
            e.TaxesNews = "TaxesNews",
            e.InsuranceNews = "InsuranceNews",
            e.RealEstateNews = "RealEstateNews",
            e.CareersNews = "CareersNews",
            e.EducationNews = "EducationNews",
            e.SmallBusinessNews = "SmallBusinessNews",
            e.BusinessNews = "BusinessNews",
            e.BusinessClassNews = "BusinessClassNews",
            e.TechnologyNews = "TechnologyNews",
            e.EconomyNews = "EconomyNews",
            e.CareerEducationNews = "CareerEducationNews",
            e.VideoNews = "VideoNews",
            e.FinanceNews = "FinanceNews",
            e.ConsolidatedCreditNews = "ConsolidatedCreditNews",
            e.GadgetsNews = "GadgetsNews",
            e.IndepthNews = "IndepthNews",
            e.IncometaxNews = "IncometaxNews",
            e.EntrepreneurNews = "EntrepreneurNews",
            e.MarketexpressNews = "MarketexpressNews",
            e.PropertyNews = "PropertyNews",
            e.SavingInvestingNews = "SavingInvestingNews",
            e.BeursNews = "BeursNews",
            e.LuxuryNews = "LuxuryNews",
            e.StartupNews = "StartupNews",
            e.TarimNews = "TarimNews",
            e.FgtsNews = "FgtsNews",
            e.Events = "Events",
            e.ExploreCenter = "ExploreCenter",
            e.Compare = "Compare",
            e.Ask = "Ask",
            e.Unknown = "Unknown"
        }(i || (i = {})),
        function(e) {
            e.Undefined = "Undefined",
            e.Watchlist_Management = "Watchlist_Management",
            e.Watchlist_Browsing = "Watchlist_Browsing",
            e.CurrencyL1 = "CurrencyL1",
            e.CurrencyDetail = "CurrencyDetail"
        }(r || (r = {})),
        function(e) {
            e.Summary = "Summary",
            e.Financials = "Financials",
            e.Analysis = "Analysis",
            e.Options = "Options",
            e.Earnings = "Earnings",
            e.Ownership = "Ownership",
            e.Company = "Company",
            e.History = "History",
            e.Related = "Related",
            e.Sentiment = "Sentiment",
            e.Grades = "Grades",
            e.Holdings = "Holdings",
            e.Events = "Events"
        }(s || (s = {})),
        function(e) {
            e.KeyRatios = "KeyRatios",
            e.IncomeStatement = "IncomeStatement",
            e.BalanceSheet = "BalanceSheet",
            e.CashFlow = "CashFlow",
            e.Unknown = "Unknown"
        }(o || (o = {})),
        function(e) {
            e.Landing = "Landing",
            e.Learn_Cryptocurrencies = "Learn_Cryptocurrencies",
            e.Detail = "Detail",
            e.Cryptocurrencies = "Cryptocurrencies",
            e.CryptocurrencyDetails = "CryptocurrencyDetails",
            e.CryptocurrenciesLanding = "CryptocurrenciesLanding",
            e.CurrencyConverter = "CurrencyConverter",
            e.Detail_L3 = "Detail_L3",
            e.Watchlist = "Watchlist",
            e.Markets = "Markets",
            e.Discover = "Discover",
            e.InvestorDetails = "InvestorDetails",
            e.ListDetails = "ListDetails",
            e.InvestingNews = "InvestingNews",
            e.CompaniesNews = "CompaniesNews",
            e.CompanyNews = "CompanyNews",
            e.TopStocksNews = "TopStocksNews",
            e.PersonalFinanceNews = "PersonalFinanceNews",
            e.SpendingNews = "SpendingNews",
            e.RetirementNews = "RetirementNews",
            e.CreditNews = "CreditNews",
            e.TaxesNews = "TaxesNews",
            e.InsuranceNews = "InsuranceNews",
            e.RealEstateNews = "RealEstateNews",
            e.CareersNews = "CareersNews",
            e.EducationNews = "EducationNews",
            e.SmallBusinessNews = "SmallBusinessNews",
            e.BusinessNews = "BusinessNews",
            e.BusinessClassNews = "BusinessClassNews",
            e.TechnologyNews = "TechnologyNews",
            e.EconomyNews = "EconomyNews",
            e.CareerEducationNews = "CareerEducationNews",
            e.VideoNews = "VideoNews",
            e.FinanceNews = "FinanceNews",
            e.ConsolidatedCreditNews = "ConsolidatedCreditNews",
            e.GadgetsNews = "GadgetsNews",
            e.IndepthNews = "IndepthNews",
            e.IncometaxNews = "IncometaxNews",
            e.EntrepreneurNews = "EntrepreneurNews",
            e.MarketexpressNews = "MarketexpressNews",
            e.PropertyNews = "PropertyNews",
            e.SavingInvestingNews = "SavingInvestingNews",
            e.BeursNews = "BeursNews",
            e.LuxuryNews = "LuxuryNews",
            e.StartupNews = "StartupNews",
            e.TarimNews = "TarimNews",
            e.FgtsNews = "FgtsNews",
            e.Events = "Events",
            e.ExploreCenter = "ExploreCenter",
            e.Compare = "Compare",
            e.Ask = "Ask",
            e.Unknown = "Unknown"
        }(a || (a = {})),
        function(e) {
            e.ManagementView = "management",
            e.QuoteId = "id",
            e.DefaultTab = "tab",
            e.Noti = "noti",
            e.Ocid = "ocid",
            e.L3 = "l3",
            e.QnAId = "qnaid",
            e.CollapsibleQuotesActiveIndex = "cqai",
            e.CrashCourseID = "crcoid",
            e.RelatedQuoteId = "relatedQuoteId",
            e.RelatedSource = "relatedSource",
            e.NewWatchlist = "isNew",
            e.TraceId = "tid",
            e.VideoContentID = "vdcnid",
            e.SkipAuth = "skipAuth",
            e.IntEnv = "intEnv",
            e.NoHeader = "noheader",
            e.ScrollTo = "scrollTo",
            e.Sector = "sector",
            e.AddedIds = "addedIds",
            e.MiddleLayerId = "miid",
            e.EventId = "eventId",
            e.EventLevel = "eventLevel",
            e.EntityIdentifier = "entityIdentifier",
            e.Comparison = "comps",
            e.ComparePageView = "view",
            e.SMSImage = "smsimg",
            e.PostId = "postId",
            e.P1src = "p1src",
            e.Scenario = "scenario"
        }(c || (c = {})),
        function(e) {
            e.RecentViewed = "Recent",
            e.TopGainers = "TopGainers",
            e.TopLosers = "TopLosers",
            e.MostActives = "MostActives",
            e.Currency = "Currency",
            e.Bond = "Bond",
            e.Crypto = "Crypto",
            e.PopularSearch = "PopularSearch",
            e.PeopleAlsoWatch = "peopleAlsoWatch",
            e.Markets = "Markets",
            e.LargestComponents = "largestComponents",
            e.RelatedIndices = "relatedIndices",
            e.TopHoldings = "TopHoldings",
            e.UpComingEarnings = "UpComingEarnings",
            e.EarningsSurpeise = "EarningsSurprise",
            e.SentimentBullish = "SentimentBullish",
            e.SentimentBearish = "SentimentBearish",
            e.RelatedQuotes = "Related",
            e.TopGradedStocks = "TopGradedStocks",
            e.RecentlyUpgradedStocks = "RecentlyUpgradedStocks",
            e.ListDetails = "ListDetails",
            e.ETFMarkets = "ETFMarkets",
            e.FundMarkets = "FundMarkets",
            e.Projection = "Projection"
        }(u || (u = {})),
        function(e) {
            e.CryptoInsights = "CryptoInsights",
            e.CryptoVideos = "CryptoVideos",
            e.TrendingArticles = "TrendingArticles",
            e.CryptoTutorials = "CryptoTutorials",
            e.TrendingQuestions = "TrendingQuestions",
            e.CryptoPortfolio = "CryptoPortfolio",
            e.CryptoLists = "CryptoLists",
            e.TrendingNews = "TrendingNews"
        }(d || (d = {})),
        function(e) {
            e.CryptoInsights = "fdc_cryptoInsights",
            e.CryptoVideos = "fdc_videosFeed",
            e.CryptoTutorials = "fdc_learnCryptoHeader",
            e.CryptoTutorialsDT = "fdc_learnCryptoHeaderDT",
            e.CryptoTutorialsFromInsights = "fdc_learnCryptoHeaderIns",
            e.CryptoLists = "fdc_cryptoLists",
            e.TrendingQuestions = "fdc_financeCryptoQnA",
            e.TrendingNews = "fdc_financeFeeds_cryptol1",
            e.TrendingNewsGeoPolitical = "fdc_financeFeeds_crypto"
        }(l || (l = {})),
        function(e) {
            e.PriceIncrement = "Price_Increase",
            e.PriceDecrement = "Price_Decrease",
            e.EarningRelease = "EarningRelease",
            e.InstitutionalHolding = "InstitutionalHolding",
            e.TechnicalIndicator = "TechnicalIndicator",
            e.Sentiment = "Sentiment"
        }(h || (h = {})),
        function(e) {
            e.Msn = "Msn",
            e.Windows = "Windows",
            e.WindowsApp = "WindowsApp"
        }(p || (p = {})),
        function(e) {
            e.MlAl = "MlAl",
            e.DomainAl = "DomainAl"
        }(w || (w = {}));
        !function(e) {
            e.Normal = "Normal",
            e.Regex = "Regex",
            e.SEO = "SEO",
            e.END = "END"
        }(f || (f = {}));
        var g, m;
        function S() {
            return !("undefined" == typeof window || !window.document || !window.document.createElement || window.isRenderServiceEnv)
        }
        !function(e) {
            e.InstitutionalHolding = "InstitutionalHolding",
            e.IndividualHolding = "IndividualHolding",
            e.PriceIncrease = "Price_Increase",
            e.PriceDecrease = "Price_Decrease",
            e.Sentiment = "Sentiment",
            e.StockGrade = "StockGrade",
            e.EarningRelease = "EarningRelease",
            e.TechnicalIndicator = "TechnicalIndicator"
        }(g || (g = {})),
        function(e) {
            e.down = "down",
            e.up = "up"
        }(m || (m = {}));
        let y = new Map;
        const v = Object.freeze({
            set(e, t) {
                return y.set(e, t),
                this
            },
            get: function(e, t) {
                let n = y.get(e);
                return void 0 === n && t && (n = t(),
                y.set(e, n)),
                n
            },
            clear() {
                y.clear()
            },
            delete: e=>y.delete(e),
            has: e=>y.has(e)
        });
        const C = [0, 656, 980, 1304]
          , N = [0, 540, 768, 1084, 1400, 1779];
        function T(e, t=N) {
            for (let n = t.length - 1; n >= 0; n--)
                if (e >= t[n])
                    return n
        }
        const k = {
            ver: "0.1.0",
            spec: {
                innerWidth: {
                    clientValue: ()=>window.innerWidth
                },
                innerHeight: {
                    clientValue: ()=>window.innerHeight
                },
                outerWidth: {
                    clientValue: ()=>window.outerWidth
                },
                breakpoint: {
                    clientValue: ()=>T(window.innerWidth, C)
                },
                locationHash: {
                    clientValue: ()=>window.location.hash
                },
                locationHref: {
                    clientValue: ()=>window.location.href
                },
                locationHost: {
                    clientValue: ()=>window.location.host
                },
                locationHostName: {
                    clientValue: ()=>window.location.hostname
                },
                locationOrigin: {
                    clientValue: ()=>window.location.origin
                },
                locationPathName: {
                    clientValue: ()=>window.location.pathname
                },
                locationProtocol: {
                    clientValue: ()=>window.location.protocol
                },
                locationSearch: {
                    clientValue: ()=>window.location.search
                },
                screenTop: {
                    clientValue: ()=>window.screenTop
                },
                screenY: {
                    clientValue: ()=>window.screenY
                },
                canUseCssGrid: {
                    clientValue: ()=>window.CSS && window.CSS.supports && CSS.supports("display", "grid") || !1
                },
                devicePixelRatio: {
                    clientValue: ()=>window.devicePixelRatio
                },
                language: {
                    clientValue: ()=>document.documentElement.lang
                },
                direction: {
                    clientValue: ()=>document.documentElement.dir
                }
            }
        }
          , I = "__RequestDataInstance__";
        class R {
            constructor(e, t) {
                if (this.url = new URL(e.href),
                this.innerHeight = e.innerHeight,
                this.devicePixelRatio = e.devicePixelRatio,
                this.canUseCssGrid = e.canUseCssGrid,
                this.requestId = e.requestId,
                this.cookie = e.cookie,
                this.referer = e.referer,
                this.userAgent = e.userAgent,
                this.oneServiceHeaders = function(e) {
                    try {
                        if (e)
                            return JSON.parse(e)
                    } catch (e) {}
                }(e.oneServiceHeaders) || {},
                this.isPssrMode = t,
                t) {
                    const e = b("OSATE", this.cookie)
                      , t = !!e && "1" === e
                      , n = b("OSAT", this.cookie);
                    if (t && n || !e && !n)
                        return this.msalAuthReady = !0,
                        void (n && (this.oneServiceHeaders.Authorization = `Bearer ${n}`));
                    this.msalAuthReady = !1,
                    this.pssrRejectedReason = e && !t ? "interactiveLogin" : e && !n ? "missOSAT" : "missOSATE"
                }
            }
            static getInstance() {
                const e = v.get(I);
                return e || (n.g.TEST_ENV ? E({
                    href: "http://localhost:8080/",
                    innerHeight: 768,
                    devicePixelRatio: 1,
                    canUseCssGrid: !1,
                    requestId: "0",
                    cookie: "",
                    userAgent: "",
                    referer: "",
                    oneServiceHeaders: ""
                }) : E({
                    href: "http://localhost:8080/",
                    innerHeight: 0,
                    devicePixelRatio: 0,
                    canUseCssGrid: !1,
                    requestId: "0",
                    cookie: "",
                    userAgent: "",
                    referer: "",
                    oneServiceHeaders: ""
                }))
            }
            static resetInstance(e, t=!1) {
                const n = new R(e,t);
                return v.set(I, n),
                n
            }
        }
        function b(e, t) {
            if (t && e) {
                const n = new RegExp("\\b" + e + "\\s*=\\s*([^;]*)","i").exec(t);
                return n && n.length > 1 ? n[1] : null
            }
            return null
        }
        const E = R.resetInstance
          , L = ()=>R.getInstance();
        function _() {
            return S() ? window.location.href : L().url.href
        }
        var O;
        let D;
        !function(e) {
            e.Stocks = "stock",
            e.Funds = "fund",
            e.Commodity = "future",
            e.Indices = "index",
            e.ETF = "etf",
            e.Currency = "currencyPair",
            e.Cryptocurrency = "cryptocurrency"
        }(O || (O = {}));
        new Promise((e=>{
            D = e
        }
        ));
        let M = null;
        n(87322);
        var A, H;
        !function(e) {
            e.RisingFast = "rising fast",
            e.DroppingFast = "dropping fast",
            e.RoseQuickly = "rose quickly",
            e.DroppedQuickly = "dropped quickly",
            e.EarningsBeat = "earnings beat",
            e.EarningsMiss = "earnings miss",
            e.InvestorSells = "investor sells",
            e.InvestorBuys = "investor buys",
            e.InvestorHolds = "investor holds",
            e.InvestorNew = "new investor",
            e.InvestorsNew = "new Investors",
            e.InvestorExits = "investor exits",
            e.InvestorsExit = "investors exit",
            e.SentimentReinforced = "sentiment reinforced",
            e.SentimentVulnerable = "sentiment vulnerable",
            e.SentimentMentionsIncrease = "mentions increase",
            e.SentimentMentionsDecrease = "mentions decrease",
            e.TechnicalNewHigh = "new 52wk high",
            e.TechnicalNewLow = "new 52wk low",
            e.TechnicalPriceAboveMA = "price above ma",
            e.TechnicalPriceBelowMA = "price below ma",
            e.TechnicalPriceAbove200DMA = "above 200 dma",
            e.TechnicalPriceBelow200DMA = "below 200 dma",
            e.TechnicalPriceAbove50DMA = "above 50 dma",
            e.TechnicalPriceBelow50DMA = "below 50 dma",
            e.Technical200DayMA = "200 day ma",
            e.Technical50DayMA = "50 day ma",
            e.Technical50WeekMA = "50 week ma",
            e.Technical20WeekMA = "20 week ma",
            e.Technical20MonthMA = "20 month ma",
            e.Technical10MonthMA = "10 month ma",
            e.TechnicalOversoldRSI = "oversold rsi",
            e.TechnicalOverboughtRSI = "overbought rsi",
            e.MarketDown = "market down",
            e.MarketUp = "market up"
        }(A || (A = {})),
        function(e) {
            e.overrideByNoti = "overrideByNoti",
            e.moreTI = "moreTI",
            e.ti = "ti",
            e.chartWidth = "chartWidth"
        }(H || (H = {}));
        new Map([[g.EarningRelease.toLowerCase(), i.L3_Earnings], [g.IndividualHolding.toLowerCase() + O.Commodity, i.Commodity_L3_Ownership], [g.IndividualHolding.toLowerCase() + O.ETF, i.ETF_L3_Ownership], [g.IndividualHolding.toLowerCase() + O.Funds, i.Fund_L3_Ownership], [g.IndividualHolding.toLowerCase(), i.L3_Ownership], [g.InstitutionalHolding.toLowerCase() + O.Commodity, i.Commodity_L3_Ownership], [g.InstitutionalHolding.toLowerCase() + O.ETF, i.ETF_L3_Ownership], [g.InstitutionalHolding.toLowerCase() + O.Funds, i.Fund_L3_Ownership], [g.InstitutionalHolding.toLowerCase(), i.L3_Ownership], [g.Sentiment.toLowerCase() + O.Stocks, i.L3_Sentiment], [g.Sentiment.toLowerCase() + O.Indices, i.Index_L3_Sentiment], [g.TechnicalIndicator.toLowerCase() + O.Indices, i.Index], [g.TechnicalIndicator.toLowerCase() + O.ETF, i.ETF], [g.TechnicalIndicator.toLowerCase() + O.Funds, i.Fund], [g.TechnicalIndicator.toLowerCase() + O.Commodity, i.Commodity], [g.TechnicalIndicator.toLowerCase() + O.Cryptocurrency, i.Cryptocurrency], [g.TechnicalIndicator.toLowerCase() + O.Currency, i.Currency], [g.TechnicalIndicator.toLowerCase() + O.Stocks, i.Stock], [g.TechnicalIndicator.toLowerCase(), i.Stock]]);
        function P(e) {
            try {
                if (e)
                    return JSON.parse(e)
            } catch (e) {}
            return null
        }
        function x(e) {
            try {
                return decodeURIComponent(e)
            } catch (e) {}
        }
        const F = "Authorization";
        var $, W;
        !function(e) {
            e.Presentation = "presentation"
        }($ || ($ = {})),
        function(e) {
            e.Unknown = "Unknown",
            e.Portrait = "Portrait",
            e.Landscape = "Landscape"
        }(W || (W = {}));
        var j, U;
        !function(e) {
            e[e.Undefined = 0] = "Undefined",
            e[e.Basic = 1] = "Basic",
            e[e.Advanced = 2] = "Advanced",
            e[e.Premium = 3] = "Premium"
        }(j || (j = {})),
        function(e) {
            e.Init = "init",
            e.Config = "config",
            e.Targeted = "targeted",
            e.Sticky = "sticky",
            e.NoSticky = "no_sticky",
            e.Admin = "admin",
            e.Forced = "forced",
            e.Manual = "manual"
        }(U || (U = {}));
        const B = new Set(["winp0dash", "winp1taskbar", "winp1taskbarent", "winp1taskbardirect", "winp1taskbardirectent", "winp1taskbarent", "winp2juntaskbar", "winp2juntaskbarent", "winp2", "winp2ent", "winp2fp", "winp2fpent", "winp2fptaskbar", "winp2fptaskbarent", "winp2fptaskbarhover", "winp2fptaskbarhoverent", "winp2widget", "winp2widgetent"])
          , V = new Set(["msedgdhp", "msedgdhphdr", "msedgntphdr", "msedgntp", "msedgdhp", "entnewsntp"]);
        var q, G, J, z;
        function Y() {
            var e;
            return S() ? P(document.head.dataset.clientSettings || (null === (e = document.getElementsByClassName("peregrine-widget-settings")[0]) || void 0 === e ? void 0 : e.getAttribute("data-client-settings"))) : null
        }
        !function(e) {
            e.outlookMobile = "OnOOutlookMobile",
            e.officeMobile = "OnOOfficeMobile",
            e.sapphire = "OnOStartApp",
            e.skype = "OnOSkype"
        }(q || (q = {}));
        class Q {
            constructor(e) {
                this.searchParams = Object.create(null),
                this.parseQueryString(e)
            }
            set(e, t) {
                return null != t && (this.searchParams[e] = t),
                this
            }
            get(e) {
                return this.searchParams[e]
            }
            delete(e) {
                delete this.searchParams[e]
            }
            toString() {
                const e = Object.keys(this.searchParams);
                return e.length ? e.sort().map((e=>`${e}=${this.searchParams[e]}`)).join("&") : ""
            }
            parseQueryString(e) {
                if (!e)
                    return;
                const t = e.indexOf("?");
                t > -1 && (e = e.substring(t + 1)),
                e.split("&").forEach((e=>{
                    const t = e.split("=")
                      , n = t[0];
                    this.get(n) || (this.searchParams[n] = t[1])
                }
                ))
            }
        }
        let K;
        function X(e, t) {
            if (!e)
                return null;
            if (t)
                return function(e) {
                    var t;
                    const n = null === (t = document.cookie) || void 0 === t ? void 0 : t.match(`\\b ${e}=([^;]*)`);
                    return n ? x(n[1]) : null
                }(e);
            if (!K) {
                const e = "undefined" != typeof document && document.cookie.split("; ");
                K = {};
                const t = e && e.length;
                for (let n = 0; n < t; n++) {
                    const t = e[n].indexOf("=");
                    K[e[n].slice(0, t).toLocaleLowerCase()] = x(e[n].slice(t + 1))
                }
            }
            const n = e.toLocaleLowerCase();
            return K[n] || null
        }
        function Z(e) {
            let t, n = !1;
            const i = function() {
                return n || (n = !0,
                t = e()),
                t
            };
            return i.cache = {
                clear: ()=>{
                    n = !1,
                    t = void 0
                }
            },
            i
        }
        !function(e) {
            e[e.Unknown = 0] = "Unknown",
            e[e.NotSignedIn = 1] = "NotSignedIn",
            e[e.SignedIn = 2] = "SignedIn"
        }(G || (G = {})),
        function(e) {
            e.MSA = "MSA",
            e.AAD = "AAD",
            e.UNSUPPORTED_SOVEREIGNTY = "UNSUPPORTED_SOVEREIGNTY"
        }(J || (J = {})),
        function(e) {
            e[e.NonAadAccount = 0] = "NonAadAccount",
            e[e.AadAccount = 1] = "AadAccount",
            e[e.Unknown = 2] = "Unknown"
        }(z || (z = {}));
        const ee = "currentaccount"
          , te = Z((()=>{
            const e = X(ee, !0)
              , t = e && P(e)
              , {login_hint: n} = t || {};
            return n && t
        }
        ))
          , ne = Z((()=>!!X(ee)));
        let ie = new class {
            constructor() {
                S() ? (this.isDebugEnabled = (function(e, t) {
                    const n = t.replace(/[[\]]/g, "\\$&")
                      , i = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)").exec(e);
                    if (!i)
                        return null;
                    const r = i[2];
                    return decodeURIComponent(r.replace(/\+/g, " ")) || ""
                }(window.location.href, "debug") || "").toLowerCase()in {
                    1: 1,
                    true: 1
                },
                this.isDebugEnabled && !n.g.TEST_ENV && (window.webpackRequire = n)) : this.isDebugEnabled = !1
            }
            getLoggingService() {
                return null
            }
            isDebug() {
                return this.isDebugEnabled
            }
            setDebug(e) {
                this.isDebugEnabled = e
            }
            setTags(e) {}
            log(e, t) {
                this.isDebug() && console.info(e)
            }
            logError(e) {
                console.error(e)
            }
            logCallback(e) {
                this.isDebug() && console.info(e())
            }
            logObjects(...e) {
                this.isDebug() && console.log(...e)
            }
            logSingleObject(e, t) {
                this.isDebug() && console.log(e)
            }
        }
        ;
        let re = new class extends class {
            constructor(e) {
                this.storage = e
            }
            get supported() {
                return !!this.storage
            }
            getItem(e) {
                if (this.supported)
                    return this.storage.getItem(e)
            }
            getObject(e, t) {
                const n = this.getItem(e);
                if (null != n) {
                    const e = P(n);
                    if (null != e)
                        return e
                }
                return t
            }
            key(e) {
                if (this.supported && e >= 0)
                    return this.storage.key(e)
            }
            keys() {
                return this.supported ? Object.keys(this.storage) : []
            }
            setObject(e, t) {
                void 0 !== t ? this.setItem(e, JSON.stringify(t)) : this.removeItem(e)
            }
            removeObject(e) {
                const t = this.removeItem(e);
                if (null != t)
                    return P(t)
            }
            setItem(e, t, n=!0) {
                if (this.supported)
                    try {
                        if (!t)
                            throw "Attempted to store null/undefined value: " + t;
                        this.storage.setItem(e, t)
                    } catch (e) {
                        if (!n)
                            throw e;
                        ie.logError(e)
                    }
                else if (!n)
                    throw new Error("WebStorage not supported")
            }
            get length() {
                if (this.supported)
                    return this.storage.length
            }
            removeItem(e) {
                if (this.supported) {
                    const t = this.getItem(e);
                    return this.storage.removeItem(e),
                    t
                }
            }
            clear() {
                this.supported && this.storage.clear()
            }
            removeSubstringKeys(e) {
                if (!this.supported || !e)
                    return;
                const t = [];
                for (let n = 0; n < this.storage.length; n++) {
                    const i = this.key(n);
                    i && i.includes(e) && t.push(i)
                }
                for (let e = 0; e < t.length; e++)
                    this.removeItem(t[e])
            }
        }
        {
            constructor() {
                let e = null;
                if (S())
                    try {
                        e = localStorage
                    } catch (e) {}
                super(e)
            }
        }
        ;
        const se = "__PageExperimentInstance__";
        function oe(e) {
            v.set(se, e)
        }
        function ae(e) {
            !v.has(se) && S() && oe(ce(document.head.dataset.info || ""));
            const t = v.get(se);
            return t && t.has(e)
        }
        function ce(e) {
            const t = (e || "").replace(/(^f:|;.*$)/g, "").split(",");
            return new Set(t)
        }
        const ue = "1s-tokens"
          , de = 12096e5;
        var le;
        let he, pe;
        function we() {
            return he = ge(),
            he && he.accessToken ? he : void 0
        }
        function fe() {
            if (he = ge(),
            !he)
                return "notAvailable";
            const e = he.expiresOn
              , t = new Date(e)
              , n = "expired";
            if (!t.getTime())
                return n;
            const i = new Date
              , r = "valid";
            if (t > i)
                return r;
            if (ae("prg-noext"))
                return n;
            {
                const e = te();
                if (e && e.account_type === J.MSA) {
                    if (new Date(t.getTime() + de) > i)
                        return r
                }
            }
            return n
        }
        function ge() {
            return he = he || void 0 === he && re.getObject(ue) || null,
            he
        }
        function me() {
            try {
                return localStorage
            } catch (e) {
                return null
            }
        }
        !function(e) {
            e.NotAvailable = "notAvailable",
            e.Expired = "expired",
            e.Valid = "valid"
        }(le || (le = {}));
        const Se = "uxlogin"
          , ye = "uxlogout"
          , ve = "uxedit"
          , Ce = "useRedirect"
          , Ne = "uxswitch"
          , Te = Z((()=>{
            const e = me();
            return e && "1" === e.getItem(Se) || S() && location.search && location.search.includes("uxlogin=1")
        }
        ));
        const ke = Z((()=>{
            const e = function() {
                try {
                    return sessionStorage
                } catch (e) {
                    return null
                }
            }();
            return e && !!e.getItem(ye)
        }
        ));
        const Ie = Z((()=>{
            const e = me();
            return e && "1" === e.getItem(ve)
        }
        ));
        const Re = Z((()=>{
            const e = me()
              , t = !ae("prg-noredirect") && e && "1" === e.getItem(Ce) && function() {
                const e = document.head.dataset.clientSettings || ""
                  , {browser: t} = P(e) || {}
                  , {browserType: n=""} = t || {};
                return !!/safari/i.test(n)
            }();
            return t
        }
        ));
        const be = Z((()=>{
            const e = me();
            return e && "1" === e.getItem(Ne)
        }
        ));
        var Ee;
        !function(e) {
            e.outlookMobile = "OnOOutlookMobile",
            e.officeMobile = "OnOOfficeMobile",
            e.sapphire = "OnOStartApp",
            e.skype = "OnOSkype",
            e.winWeatherApp = "weather-app-win",
            e.winMoneyApp = "finance-app-win"
        }(Ee || (Ee = {}));
        let Le = Fe("ocid")
          , _e = Fe("chpltfm")
          , [Oe,De] = _e.toLowerCase().split("-");
        function Me() {
            if (!S())
                return !1;
            const e = window.sapphireWebViewBridge
              , t = window.webkit
              , n = e && e.send
              , i = t && t.messageHandlers && t.messageHandlers.send && t.messageHandlers.send.postMessage;
            return !(!n && !i)
        }
        function Ae() {
            const e = _e && "outlook" === Oe && ["ios", "android"].includes(De)
              , t = Le === Ee.outlookMobile;
            return e || t
        }
        function He() {
            const e = _e && "office" === Oe && ["ios", "android"].includes(De)
              , t = Le === Ee.officeMobile;
            return e || t
        }
        function Pe() {
            return S() && (null === (e = window.skypeWebviewBridge) || void 0 === e ? void 0 : e.isSkype) || Le === Ee.skype;
            var e
        }
        const xe = Z((()=>Me() || Pe() || He() || Ae() || Me() || Le === Ee.sapphire || "superappdhp" === Le || Le === Ee.winWeatherApp || Le === Ee.winMoneyApp));
        function Fe(e) {
            try {
                return new URL(location.href).searchParams.get(e) || ""
            } catch (e) {
                return ""
            }
        }
        const $e = Y() || {}
          , We = {
            newsAndInterests: 1,
            windowsNewsbar: 1,
            windowsNewsPlus: 1,
            winWidgets: 1,
            windowsShell: 1,
            windowsShellV2: 1,
            distribution: 1,
            superApp: 1,
            channel: 1
        }
          , je = {
            edgeChromium: 1
        }
          , Ue = {
            winWidgets: 1
        }
          , Be = {
            shopping: 1
        }
          , Ve = Z((()=>$e && $e.apptype))
          , qe = Z((()=>!!(Je() && (te() || !X("ace")))))
          , Ge = (Z((()=>S() && Ve()in Ue)),
        Z((()=>S() && !xe() && !(Ve()in We) && !ze() && !Ye())))
          , Je = Z((()=>Ge() && !(Ve()in je)));
        Z((()=>Ge() && (!(Ve()in je) || !ne()))),
        Z((()=>Ge() && !Ke() && !Xe()));
        Z((()=>{
            const e = (S() ? window.location.host : L().url.host).toLowerCase().endsWith(".cn");
            return Ge() && (!e || e && !ae("prg-no-auth-zhcn"))
        }
        ));
        const ze = Z((()=>!ae("prg-1s-no-edgeid") && !(Ve()in Be) && "edgeChromium" !== Ve() && function() {
            const {browser: e} = $e
              , {browserType: t=""} = e || {};
            return !!/edgeChromium/i.test(t)
        }() && (Ze(V) || Ze(B))))
          , Ye = ()=>S() && document && document.body && document.body.getElementsByClassName("peregrine-widgets").length > 0;
        function Qe() {
            const e = pe;
            if (e)
                return ie.log("dual-auth: tryGet1SAuthToken returned live tokens"),
                e;
            const t = we();
            if (t)
                return ie.log(`dual-auth: tryGet1SAuthToken returned cached tokens that are ${fe()}`),
                t;
            ie.log("dual-auth: tryGet1SAuthToken returned empty tokens")
        }
        function Ke() {
            return Je() && Te() || qe() && (qe() && !Te() && te() && ("expired" == fe() || Ie()) || ke() || Re())
        }
        function Xe() {
            return Je() && !te() && be()
        }
        function Ze(e) {
            const t = new URLSearchParams(S() ? window.location.search : L().url.search).get("ocid") || $e && $e.ocid;
            return e && e.has(t && t.toLowerCase())
        }
        const et = Object.freeze({
            AIDRequestHeaderName: "pcs-aid",
            Product: Object.freeze({
                mmx: "emmx",
                edge: "spartan",
                edgeChromium: "anaheim",
                hybrid: "spartan",
                hub: "prime",
                microsoftNews: "msnews",
                office: "entnews",
                weather: "prime"
            }),
            PageTimings: Object.freeze({
                inlineStart: "page.inlineStart",
                fragmentFetchStart: "ssr.fragmentFetching",
                fragmentFetchEnd: "ssr.fragmentFetched",
                fragmentFetchStatusCode: "ssr.fragmentFetchStatusCode",
                fragmentBrowserCached: "ssr.fragmentBrowserCached",
                fragmentCDNCached: "ssr.fragmentCDNCached",
                injectingDOM: "ssr.injectingDOM",
                awaitingRAF: "ssr.awaitingRAF",
                markersSet: "ssr.markersSet",
                completed: "ssr.completed",
                CSRTimeout: "ssr.CSRTimeout",
                CSROnly: "ssr.csrOnly",
                didSSR: "ssr.isSSRPagePresent",
                riverEnabled: "ssr.riverEnabled",
                ssrState: "ssr.state",
                pageTTVR: "TTVR",
                fetchDelayReason: "ssr.fetchDelayReason",
                awaitingInnerWidthTime: "ssr.awaitingInnerWidthTime",
                skipDueToHiddenReason: "ssr.skipDueToHiddenReason",
                pssrRejectedReason: "ssr.pssrRejected",
                ssrResponseSize: "ssr.responseSize",
                inlineBodyStart: "ssr.inlineBodyStart",
                pcsEnv: "pcsEnv"
            }),
            pauseThresholdMS: 1200,
            oneServiceHeaders: "1s-headers",
            edgeNTPHeader: "sec-edge-ntp",
            defaultSSRFeedLayout: "multi"
        });
        var tt, nt, it, rt;
        !function(e) {
            e[e.Mmx = 0] = "Mmx",
            e[e.Hub = 1] = "Hub",
            e[e.Homepage = 2] = "Homepage",
            e[e.Edge = 3] = "Edge",
            e[e.Weather = 4] = "Weather",
            e[e.Finance = 5] = "Finance",
            e[e.Community = 6] = "Community",
            e[e.Views = 7] = "Views",
            e[e.Gaming = 8] = "Gaming",
            e[e.Sports = 9] = "Sports",
            e[e.Health = 10] = "Health",
            e[e.Shopping = 11] = "Shopping",
            e[e.CgHomePage = 12] = "CgHomePage"
        }(tt || (tt = {})),
        function(e) {
            e[e.documentHidden = 0] = "documentHidden",
            e[e.hasPaused = 1] = "hasPaused",
            e[e.invalidInnerWidth = 2] = "invalidInnerWidth",
            e[e.slowFetchStart = 3] = "slowFetchStart"
        }(nt || (nt = {})),
        function(e) {
            e.NotStarted = "NotStarted",
            e.Fetching = "Fetching",
            e.InsertingDOM = "InsertingDOM",
            e.Completed = "Completed",
            e.HasFetchError = "HasFetchError",
            e.HasError = "HasError",
            e.SkipDueToCSROnly = "SkipDueToCSROnly",
            e.SkipDueToHidden = "SkipDueToHidden",
            e.SkipForEarlyAuth = "SkipForEarlyAuth",
            e.PssrRejected = "PssrRejected"
        }(it || (it = {})),
        function(e) {
            e.PureSSR = "pssr",
            e.DSSR = "dssr"
        }(rt || (rt = {}));
        function st(e) {
            const t = e;
            return void 0 !== t.clientValue ? t.clientValue : Object.keys(e).reduce(((t,n)=>Object.assign(Object.assign({}, t), {
                [n]: st(e[n])
            })), {})
        }
        class ot {
            constructor(e, t) {
                this.spec = e,
                this.qspPrefix = t || "rd"
            }
            get verParam() {
                return `${this.qspPrefix}.ver`
            }
            get data() {
                return void 0 === this.memo && (this.memo = st(this.spec.spec)),
                this.memo
            }
            loadQueryParams(e) {
                if (void 0 !== this.memo)
                    throw "overwriting existing query string parameters.";
                const t = e.get([this.qspPrefix, "ver"].join("."));
                if (t !== this.spec.ver)
                    throw `unmatched spec version: expected "${this.spec.ver}" but got ${t}.`;
                this.memo = {},
                e.forEach(((e,t)=>{
                    if (!t.startsWith(this.qspPrefix))
                        return;
                    if (t === this.verParam)
                        return;
                    const n = t.split(".").slice(1);
                    let i = this.memo;
                    n.forEach(((t,r)=>{
                        let s = {};
                        if (r === n.length - 1)
                            try {
                                s = ()=>JSON.parse(e)
                            } catch (e) {
                                throw this.memo = void 0,
                                e
                            }
                        Object.prototype.hasOwnProperty.call(i, t) || (i[t] = s),
                        "object" != typeof s || (i = i[t])
                    }
                    ))
                }
                ))
            }
            getURLSearchParams() {
                const e = new URLSearchParams
                  , t = (n,i)=>{
                    Object.keys(n).forEach((r=>{
                        const s = n[r]
                          , o = [...i, r];
                        "object" != typeof s ? e.append(o.join("."), JSON.stringify(s())) : t(s, o)
                    }
                    ))
                }
                ;
                return t(this.data, [this.qspPrefix]),
                e.sort(),
                e.append(this.verParam, this.spec.ver),
                e
            }
            getSerializedData() {
                return this.getURLSearchParams().toString()
            }
        }
        var at;
        let ct, ut, dt;
        function lt() {
            if (!ct) {
                const e = document.head.getAttribute("data-client-settings");
                e && (ct = JSON.parse(e))
            }
            return ct
        }
        !function(e) {
            e.JSON = "application/json;charset=UTF-8",
            e.HTML = "text/html;charset=UTF-8"
        }(at = at || (at = {}));
        var ht;
        !function(e) {
            e[e.Alert = 0] = "Alert",
            e[e.NoAlert = 1] = "NoAlert",
            e[e.HighImpact = 2] = "HighImpact",
            e[e.Critical = 3] = "Critical"
        }(ht || (ht = {}));
        const pt = new class {
            constructor(e=20) {
                this.maxLength = 20,
                this.list = [],
                this.maxLength = e
            }
            push(e) {
                this.list.push(e),
                this.list.length > this.maxLength && this.list.shift()
            }
            get data() {
                return this.list
            }
        }
        ;
        function wt(e, t, n, i=ht.Alert) {
            try {
                const r = lt()
                  , s = function() {
                    if (ut)
                        return ut;
                    const e = document.head.getAttribute("data-info");
                    return lt(),
                    ut = ((/f:\s*([^;]+)/i.exec(e) || {})[1] || "").toLowerCase(),
                    ut
                }()
                  , o = function(e) {
                    if (e) {
                        const {pcsInfo: t, pageGenTime: n} = e
                          , i = new Date(n).getTime()
                          , r = !t || "prod" === t.env;
                        dt = r ? "browser.events.data.msn.com" : "events-sandbox.data.msn.com";
                        return {
                            cors: "true",
                            "content-type": "application/x-json-stream",
                            "client-id": "NO_AUTH",
                            "client-version": "1DS-Web-JS-2.2.2",
                            apikey: r ? "0ded60c75e44443aa3484c42c1c43fe8-9fc57d3f-fdac-4bcf-b927-75eafe60192e-7279" : "f8857dedc6f54ca8962cfb713e01e7d7-e9250191-fe0b-446f-95ae-07516262f98c-7028",
                            "upload-time": i,
                            w: "0",
                            anoncknm: "app_anon"
                        }
                    }
                    return null
                }(r);
                let a = "";
                o && o.apikey && "" !== o.apikey && (a = function(e) {
                    if (e) {
                        const t = e.indexOf("-");
                        if (t > 0)
                            return e.substring(0, t)
                    }
                    return ""
                }(o.apikey));
                const c = function(e, t, n, i, r, s, o=ht.Alert) {
                    if (n) {
                        r = r || {};
                        const {apptype: a, audienceMode: c, pagetype: u, pageGenTime: d, bundleInfo: l, deviceFormFactor: h="", fd_muid: p} = n;
                        r.pageGenTime = d,
                        r.build = l && l.v,
                        r.appType = a;
                        const w = function(e, t, n) {
                            const i = n && "phone" === n.toLowerCase();
                            return {
                                bingHomepage: "binghomepage",
                                mmx: "emmx",
                                edge: "spartan",
                                edgeChromium: t && "enterprise" === t ? "entnews" : "anaheim",
                                hybrid: "spartan",
                                hub: i ? "prime_mobile" : "prime",
                                microsoftNews: "msnews",
                                office: "entnews",
                                views: i ? "prime_mobile" : "prime",
                                windowsShell: "windowsshell"
                            }[e]
                        }(a, c, h)
                          , f = w || a
                          , g = document.getElementsByTagName("html")[0].getAttribute("lang");
                        let m = ""
                          , S = "muid";
                        try {
                            window && window.getCookieConsentRequired && "function" == typeof window.getCookieConsentRequired && window.getCookieConsentRequired() || (m = X("muid"))
                        } catch (e) {
                            console.log("error fetching muid.")
                        }
                        m || (m = n.aid,
                        S = "aid");
                        const y = {
                            name: "MS.News.Web.AppError",
                            time: d,
                            ver: "4.0",
                            iKey: `o:${i}`,
                            data: {
                                baseData: {},
                                baseType: "MS.News.Web.Base",
                                page: {
                                    name: "default",
                                    product: f,
                                    type: ft(u),
                                    content: {
                                        category: "standaloneError"
                                    }
                                },
                                browser: {
                                    clientId: m,
                                    clientIdType: S
                                },
                                flight: {
                                    id: s
                                },
                                request: {
                                    activityId: n.aid,
                                    requestId: n.aid,
                                    afdMuid: p
                                },
                                locale: {
                                    mkt: g
                                },
                                extSchema: {
                                    id: e,
                                    severity: o,
                                    pb: r,
                                    message: t
                                }
                            }
                        };
                        return y ? JSON.stringify(y) : null
                    }
                    return null
                }(t, e, r, a, n, s, i);
                if (o && c) {
                    console.error(c),
                    pt.push(c);
                    const e = "https://" + dt + "/OneCollector/1.0" + function(e) {
                        return "?" + Object.keys(e).map((function(t) {
                            return t + "=" + encodeURIComponent(e[t])
                        }
                        )).join("&")
                    }(o);
                    navigator.sendBeacon(e, c)
                } else
                    console.log("missing parameters in data-client-settings. " + e)
            } catch (t) {
                console.log("error logging the app error. " + e)
            }
        }
        function ft(e) {
            let t = e;
            switch (e) {
            case "windowsshellhp":
                t = "dhp";
                break;
            case "video":
                t = "watch"
            }
            return t
        }
        function gt(e) {
            wt("Click event occurred before hydration", 35800, {})
        }
        function mt() {
            return S() ? window._pageTimings || (window._pageTimings = {}) : v.get("__diagnostics_pageTimings", (()=>({})))
        }
        const St = "undefined"
          , yt = "ssrOnly"
          , vt = "rsorigin";
        function Ct() {
            return "hidden" === document.visibilityState
        }
        function Nt(e, t, n) {
            return e ? t + "=" + (n || e) + "&" : ""
        }
        function Tt(e, t, n, i, r, s, o="") {
            return t + function(e) {
                return typeof e !== St ? Nt(encodeURIComponent(e), "entry") : ""
            }(r) + (0 === (a = i).length ? "" : Nt(encodeURIComponent("f:" + a.join(",") + ";"), "dataInfo")) + (Nt(window.CSS && window.CSS.supports && CSS.supports("display", "grid") || "false", "grid") + Nt(document.documentElement.dir, "dir") + Nt(document.documentElement.lang, "lang") + Nt(window.innerHeight, "innerHeight") + Nt(window.devicePixelRatio, "devicePixelRatio") + Nt(encodeURIComponent(window.location.href), "href")) + function(e) {
                let t = "";
                if (e)
                    for (const n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n) && "aid" !== n && "pageGenTime" !== n) {
                            let i = e[n];
                            "object" == typeof i && (i = JSON.stringify(i)),
                            t += Nt(encodeURIComponent(i), n)
                        }
                return t
            }(n) + function(e) {
                const t = "true" === _t(yt, e)
                  , n = _t("csrDelay", e);
                let i = "";
                return t && (i += Nt("true", yt)),
                n && (i += Nt(n, "csrDelay")),
                i
            }(e) + s() + o;
            var a
        }
        function kt(e, t=performance.now(), n=!0) {
            const i = mt();
            e in i || (i[e] = n ? Math.round(t) : t)
        }
        function It(e, t=!0) {
            if (null !== (n = e) && "object" == typeof n && !1 === Array.isArray(n))
                for (const [n,i] of Object.entries(e || {}))
                    "number" == typeof i && kt(n, i, t);
            var n
        }
        function Rt(e, t=!1) {
            window.performance.mark(e),
            t && kt(e)
        }
        function bt(e) {
            for (let t = 0; t < e.ttvrFlags.length; t++)
                e.ttvrFlags[t] === et.PageTimings.pageTTVR ? Rt(e.ttvrFlags[t], !0) : Rt(e.ttvrFlags[t]);
            Rt(et.PageTimings.markersSet, !0)
        }
        function Et(e) {
            Rt(et.PageTimings.awaitingRAF, !0),
            e.ttvrFlags && (typeof document.hidden !== St == !1 || Ct() ? bt(e) : (window.requestAnimationFrame((function() {
                setTimeout((function() {
                    bt(e)
                }
                ), 0)
            }
            )),
            document.addEventListener("visibilitychange", (function() {
                bt(e)
            }
            ), {
                once: !0
            })))
        }
        function Lt(t) {
            return e(this, void 0, void 0, (function*() {
                const e = yield(n = "#root",
                new Promise((e=>{
                    const t = document.querySelector(n);
                    if (t)
                        return e(t);
                    const i = new MutationObserver((t=>{
                        const i = document.querySelector(n);
                        if (i)
                            return e(i)
                    }
                    ));
                    i.observe(document.body, {
                        childList: !0,
                        subtree: !0
                    })
                }
                )));
                var n;
                if (e.innerHTML = "",
                !window.RENDER) {
                    t.headInjectionString && document.head.insertAdjacentHTML("beforeend", t.headInjectionString),
                    e.insertAdjacentHTML("afterbegin", t.html),
                    document.head.insertAdjacentHTML("beforeend", '<style id="ssr-style">' + t.css + "</style>"),
                    t.pageTitle && (document.title = t.pageTitle),
                    Et(t),
                    window.REDUX_DATA = t.state,
                    window.SSR = it.Completed,
                    Rt(et.PageTimings.completed, !0),
                    "undefined" != typeof globalThis ? document.addEventListener("click", globalThis.untrackedClickHandler) : document.addEventListener("click", window.untrackedClickHandler);
                    const n = t.ssrTimings || {};
                    It(n),
                    It(n.configTimings),
                    It(n.pageTimings)
                }
            }
            ))
        }
        function _t(e, t) {
            return t.get(e) || t.get(e.toLowerCase())
        }
        function Ot(e) {
            window.SSR = e,
            window.RENDER = !0
        }
        function Dt(e) {
            Ot(it.HasError),
            window.SSR_ERROR = e
        }
        function Mt(e, t, n, i, r, s) {
            if (void 0 === window.SSR) {
                let o = !1;
                const {hasSsr: a, isSSRRiver: c} = e.shouldEnableSSR(t, n, i, r, s);
                if (a) {
                    o = "true" === _t(yt, t);
                    const r = function() {
                        let e = !1;
                        const t = mt()[et.PageTimings.inlineStart];
                        performance && performance.timing && performance.timing.responseStart && performance.timing.navigationStart && t && (e = t - (performance.timing.responseStart - performance.timing.navigationStart) > et.pauseThresholdMS);
                        return e
                    }()
                      , s = Ct();
                    if (!s && !r || o)
                        At(o, c);
                    else {
                        const t = s ? nt.documentHidden : nt.hasPaused;
                        kt(et.PageTimings.skipDueToHiddenReason, t);
                        !!e.shouldInsistSSRWhenHidden && e.shouldInsistSSRWhenHidden(n, i, t) ? At(o, c) : (window.SSR = it.SkipDueToHidden,
                        window.RENDER = !0)
                    }
                } else
                    Ot(it.SkipDueToCSROnly)
            }
            return !window.RENDER
        }
        function At(e, t) {
            window.SSR = it.NotStarted,
            window.RENDER = !1,
            window.SSRONLY = e,
            window.RIVER = t
        }
        function Ht(e) {
            let t = window.location.origin;
            return function(e, t) {
                const n = e.indexOf("item=spalink") >= 0 && -1 === e.indexOf("item=spalink:latest") && -1 === e.indexOf("item=spalink%3Alatest");
                return !(t.get(vt) && "true" === t.get(vt)) && n
            }(window.location.search, e) && (t = "https://int.msn.com"),
            t
        }
        function Pt(e, t, n, i, r, s=k, o, a) {
            var c;
            if (window.RENDER || window.SSR !== it.NotStarted)
                return;
            const u = null === (c = null == a ? void 0 : a.skipAuth) || void 0 === c ? void 0 : c.call(a);
            if (!u && (Xe() || Ke()))
                return void Ot(it.SkipForEarlyAuth);
            const d = new ot(s,"rd")
              , l = function(e, t) {
                const n = "true" === _t("ssrCdn", e);
                return (t || (n ? "https://assets.msn.com" : window.location.origin)) + "/render/?fragment=true&"
            }(e, o)
              , h = Tt(e, l, t, n, i, r, d.getSerializedData())
              , p = new XMLHttpRequest
              , w = e=>{
                const t = `Fragment fetch for ${h} failed. Status code: ${p.status}. ${e}`;
                wt(t, 34002, {}),
                window.SSR = it.HasFetchError,
                window.SSR_ERROR = new Error(t)
            }
            ;
            p.onabort = function() {
                w("XMLHttpRequest.onabort called.")
            }
            ,
            p.onerror = function() {
                w("XMLHttpRequest.onerror called.")
            }
            ,
            p.onreadystatechange = function() {
                try {
                    if (4 !== p.readyState)
                        return;
                    if (Rt(et.PageTimings.fragmentFetchEnd, !0),
                    kt(et.PageTimings.fragmentFetchStatusCode, p.status, !1),
                    p.status >= 200 && p.status < 300) {
                        if (!window.RENDER) {
                            window.SSR = it.InsertingDOM;
                            const e = JSON.parse(p.responseText);
                            if (e.html)
                                Rt(et.PageTimings.injectingDOM, !0),
                                Lt(e);
                            else {
                                const e = `Fragment fetch for ${h} succeeded but returned empty html.`;
                                wt(e, 34002, {}),
                                window.SSR = it.HasFetchError,
                                window.SSR_ERROR = new Error(e)
                            }
                        }
                        const e = p.getResponseHeader("Date")
                          , t = p.getResponseHeader("x-cache");
                        !function(e, t, n) {
                            const i = function(e) {
                                const t = performance.getEntriesByType("resource").filter((t=>"xmlhttprequest" === t.initiatorType && t.name === e));
                                return t.length > 0 ? t[0] : null
                            }(e);
                            let r = !1;
                            s = i,
                            r = s && ("transferSize"in s || "nextHopProtocol"in s) ? function(e) {
                                return void 0 !== e.transferSize ? 0 === e.transferSize : void 0 !== e.nextHopProtocol ? "" === e.nextHopProtocol : (wt("didUseBrowserCache was called without supporting transferSize or nextHopProtocol", 34003, {
                                    perfResourceTimingKeys: Object.keys(e || {})
                                }),
                                !1)
                            }(i) : function(e) {
                                const t = me();
                                if (!e || !t)
                                    return wt("dateResponseHeader was empty or localStorage is not supported", 34004, {
                                        dateResponseHeader: e
                                    }),
                                    !1;
                                const n = "SSRDateResponseHeader";
                                let i = !1;
                                const r = t.getItem(n);
                                r && (i = r === e);
                                i || t.setItem(n, e);
                                return i
                            }(t);
                            var s;
                            const o = function(e, t) {
                                return !e && "TCP_HIT" === t
                            }(r, n);
                            kt(et.PageTimings.fragmentBrowserCached, r ? 1 : 0, !1),
                            kt(et.PageTimings.fragmentCDNCached, o ? 1 : 0, !1)
                        }(h, e, t)
                    } else {
                        const e = "x-msedge-ref"
                          , t = p.getResponseHeader(e) || "";
                        w(`Response is not OK. Header: ${e}: ${t}`)
                    }
                } catch (e) {
                    w(`Exception occured on XMLHttpRequest.onreadystatechange.\n ${e.stack || e}`)
                }
            }
            ,
            p.open("GET", h),
            p.withCredentials = !u;
            const f = t.aid;
            if (p.setRequestHeader(et.AIDRequestHeaderName, f),
            !u && qe()) {
                const {accessToken: e} = Qe() || {}
                  , t = function(e) {
                    const t = {};
                    return e && (t[F] = `Bearer ${e}`),
                    t
                }(e);
                p.setRequestHeader(et.oneServiceHeaders, JSON.stringify(t))
            }
            window.SSR = it.Fetching,
            Rt(et.PageTimings.fragmentFetchStart, !0),
            p.send()
        }
        function xt(e) {
            wt("Error when loading bundle: " + e, 20202, {})
        }
        function Ft(e, t, n, i, r) {
            wt("JS Exception", 20203, {
                source: t,
                customMessage: e,
                line: n,
                column: i,
                stack: r && r.stack
            })
        }
        const $t = {
            ver: `${k.ver}`,
            spec: Object.assign(Object.assign({}, k.spec), {
                isDarkModeEnabled: {
                    clientValue: ()=>!0 === window.matchMedia("(prefers-color-scheme:dark)").matches
                }
            })
        }
          , Wt = {
            shouldEnableSSR: (e,t,n,i,r)=>{
                const s = {
                    hasSsr: !1,
                    isSSRRiver: !1
                };
                if ("undefined" != typeof window && window.navigator.userAgent && window.navigator.userAgent.includes("Applebot"))
                    return s;
                if ("true" === e.get("csronly"))
                    return s;
                if (i.some((e=>e.startsWith("prg-fi-csr") || e.startsWith("prg-fi-csrrf"))))
                    return s;
                switch (n) {
                case "finance":
                case "financestockdetails":
                case "financecryptocurrencydetails":
                case "finance::cryptocurrencies":
                case "finance::portfolio":
                case "finance::markets":
                case "finance::FinanceTools::FinanceCurrencyConverter":
                case "finance::compare":
                case "finance::events":
                case "money::watchlist":
                    return {
                        hasSsr: !0,
                        isSSRRiver: !1
                    };
                default:
                    return s
                }
            }
            ,
            shouldInsistSSRWhenHidden: (e,t,n)=>n === nt.documentHidden
        };
        window.onErrorHandler = xt,
        window.onerror = Ft,
        "undefined" != typeof globalThis ? globalThis.untrackedClickHandler = gt : window.untrackedClickHandler = gt;
        const jt = Y()
          , Ut = function(e) {
            return t = e && e.queryparams,
            n = window.location.search,
            t = (t || "").substring(1),
            n = (n || "").substring(1),
            new Q(t + "&" + n);
            var t, n
        }(jt)
          , Bt = function(e, t) {
            const n = document.head.dataset.info;
            let i = ((/f:\s*([^;]+)/i.exec(n) || {})[1] || "").toLowerCase().split(",");
            return i = function(e) {
                if (!e || 0 === e.length)
                    return e;
                const t = [];
                return e.forEach((e=>{
                    const n = e.toLocaleLowerCase().trim();
                    n.startsWith("prg-") && t.push(n)
                }
                )),
                t.sort()
            }(i),
            i
        }();
        function Vt(e, t, n) {
            const i = ()=>""
              , r = ()=>{
                let e = !1;
                return t.get(c.SkipAuth) && (e = !0,
                function(e, t, n=!0) {
                    if (!S() || function(e) {
                        return !e || !function(e) {
                            return e ? e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "") : e
                        }(e)
                    }(e))
                        return;
                    const i = new URL(_());
                    void 0 !== t && "" !== t ? i.searchParams.set(e, t) : i.searchParams.delete(e);
                    const r = i.toString().replace("%3A", ":");
                    window.history.replaceState({}, "", r),
                    n && (null == M || M.updatePageMetadata({
                        page: {
                            url: _()
                        }
                    }))
                }(c.SkipAuth, void 0)),
                e
            }
            ;
            try {
                const s = Ht(t);
                Pt(t, e, n, window._ssrServiceEntryUrl, i, $t, s, {
                    skipAuth: r
                })
            } catch (e) {
                Dt(e),
                wt(`Exception occured on fetchSSRPage.\n ${e.stack || e}`, 34007, {})
            }
        }
        window._clientSettings = jt,
        window.flights = Bt,
        function() {
            e(this, void 0, void 0, (function*() {
                try {
                    if (Rt(et.PageTimings.inlineStart, !0),
                    !window.RENDER)
                        if (jt && window._ssrServiceEntryUrl)
                            window.SSR_Mode = window.SSR_Mode || rt.DSSR,
                            window.SSR_Mode === rt.DSSR && function() {
                                const e = function(e) {
                                    return e.locale && e.locale.language && e.locale.market ? `${e.locale.language}-${e.locale.market}`.toLowerCase() : void 0
                                }(jt);
                                Mt(Wt, Ut, tt.Finance, jt.pagetype, Bt, e) && Vt(jt, Ut, Bt)
                            }();
                        else {
                            const e = "Failed SSR inline script due to missing client settings or SSR service entry.";
                            wt(e, 34007, {}),
                            Dt(new Error(e))
                        }
                } catch (e) {
                    Dt(e),
                    wt(`Exception occured on SSR inline script.\n ${e.stack || e}`, 34007, {})
                }
            }
            ))
        }()
    }()
}();
