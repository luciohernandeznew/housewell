const rawhtml =
`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>pp</title>
  <style>
    html {
      color: #1a1a1a;
      background-color: #fdfdfd;
    }
    body {
      margin: 0 auto;
      max-width: 36em;
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 50px;
      padding-bottom: 50px;
      hyphens: auto;
      overflow-wrap: break-word;
      text-rendering: optimizeLegibility;
      font-kerning: normal;
    }
    @media (max-width: 600px) {
      body {
        font-size: 0.9em;
        padding: 12px;
      }
      h1 {
        font-size: 1.8em;
      }
    }
    @media print {
      html {
        background-color: white;
      }
      body {
        background-color: transparent;
        color: black;
        font-size: 12pt;
      }
      p, h2, h3 {
        orphans: 3;
        widows: 3;
      }
      h2, h3, h4 {
        page-break-after: avoid;
      }
    }
    p {
      margin: 1em 0;
    }
    a {
      color: #1a1a1a;
    }
    a:visited {
      color: #1a1a1a;
    }
    img {
      max-width: 100%;
    }
    svg {
      height: auto;
      max-width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.4em;
    }
    h5, h6 {
      font-size: 1em;
      font-style: italic;
    }
    h6 {
      font-weight: normal;
    }
    ol, ul {
      padding-left: 1.7em;
      margin-top: 1em;
    }
    li > ol, li > ul {
      margin-top: 0;
    }
    blockquote {
      margin: 1em 0 1em 1.7em;
      padding-left: 1em;
      border-left: 2px solid #e6e6e6;
      color: #606060;
    }
    code {
      font-family: Menlo, Monaco, Consolas, 'Lucida Console', monospace;
      font-size: 85%;
      margin: 0;
      hyphens: manual;
    }
    pre {
      margin: 1em 0;
      overflow: auto;
    }
    pre code {
      padding: 0;
      overflow: visible;
      overflow-wrap: normal;
    }
    .sourceCode {
     background-color: transparent;
     overflow: visible;
    }
    hr {
      background-color: #1a1a1a;
      border: none;
      height: 1px;
      margin: 1em 0;
    }
    table {
      margin: 1em 0;
      border-collapse: collapse;
      width: 100%;
      overflow-x: auto;
      display: block;
      font-variant-numeric: lining-nums tabular-nums;
    }
    table caption {
      margin-bottom: 0.75em;
    }
    tbody {
      margin-top: 0.5em;
      border-top: 1px solid #1a1a1a;
      border-bottom: 1px solid #1a1a1a;
    }
    th {
      border-top: 1px solid #1a1a1a;
      padding: 0.25em 0.5em 0.25em 0.5em;
    }
    td {
      padding: 0.125em 0.5em 0.25em 0.5em;
    }
    header {
      margin-bottom: 4em;
      text-align: center;
    }
    #TOC li {
      list-style: none;
    }
    #TOC ul {
      padding-left: 1.3em;
    }
    #TOC > ul {
      padding-left: 0;
    }
    #TOC a:not(:hover) {
      text-decoration: none;
    }
    code{white-space: pre-wrap;}
    span.smallcaps{font-variant: small-caps;}
    div.columns{display: flex; gap: min(4vw, 1.5em);}
    div.column{flex: auto; overflow-x: auto;}
    div.hanging-indent{margin-left: 1.5em; text-indent: -1.5em;}
    /* The extra [class] is a hack that increases specificity enough to
       override a similar rule in reveal.js */
    ul.task-list[class]{list-style: none;}
    ul.task-list li input[type="checkbox"] {
      font-size: inherit;
      width: 0.8em;
      margin: 0 0.8em 0.2em -1.6em;
      vertical-align: middle;
    }
    .display.math{display: block; text-align: center; margin: 0.5rem auto;}
  </style>
  <!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
  <![endif]-->
</head>
<body>
<p><strong><span class="smallcaps">Privacy Policy</span></strong></p>
<p>We take your privacy very seriously. Please read this privacy policy
carefully as it contains important information on who we are and our
information practices, meaning how and why we collect, use, disclose,
sell, share, store, and retain your personal information. It also
explains your rights in relation to your personal information and how to
contact us or supervisory authorities in the event you have a complaint
or request.</p>
<p>We collect, use, and are responsible for certain personal information
about you. When we offer goods and services to individuals in the
European Economic Area (EEA), we are subject to the EU General Data
Protection Regulation (EU GDPR), which applies across the entire
European Union. For California consumers, we are subject to the
California Consumer Privacy Act of 2018 (CCPA), as amended by the
California Privacy Rights Act of 2020 (CPRA). For Utah residents, we are
subject to the Utah Consumer Privacy Act (UCPA), effective December 31,
2023. For Colorado residents, we are subject to the Colorado Privacy Act
(CPA), effective July 1, 2023. For Virginia residents, we are subject to
the Virginia Consumer Data Protection Act (VCDPA), effective January 1,
2023. For Connecticut residents we are subject to the Connecticut Data
Protection Act (CTDPA), effective July 1, 2023. We may update and make
changes to this policy, so we encourage you to review it periodically.
We are responsible as a “controller” of that personal information for
the purposes of the GDPR. We are responsible for your personal
information as a “business” under the CCPA/CPRA.</p>
<ol type="1">
<li><p><strong>Key Terms.</strong> It would be helpful to start by
explaining some key terms used in this policy:</p></li>
</ol>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>We, us, our</td>
<td>HOUSEWELL TECHNOLOGIES, INC. and our group companies, including
Housewell.com Realty, LLC</td>
</tr>
<tr class="even">
<td>Our representative</td>
<td>Parker Bryant or his named successor</td>
</tr>
<tr class="odd">
<td>Our data protection officer</td>
<td><p>Parker Bryant or his named successor</p>
<p>parker@housewell.com</p></td>
</tr>
<tr class="even">
<td>Personal information</td>
<td>Any information relating to an identified or identifiable
individual.</td>
</tr>
<tr class="odd">
<td>Special category personal information</td>
<td>Personal information revealing racial or ethnic origin, political
opinions, religious beliefs, philosophical beliefs, or trade union
membership; genetic and biometric data; and data concerning health, sex
life or sexual orientation.</td>
</tr>
<tr class="even">
<td>Sensitive Personal Information</td>
<td>Personal information revealing a consumer's social security number,
driver's license and passport numbers, account numbers and credentials,
precise geolocation, racial or ethnic origin, religious beliefs, or
union membership, personal information concerning a consumer's health,
sex life, or sexual orientation, contents of a consumer's mail, email
and text messages where the business is not the intended recipient,
genetic data, and biometric information.</td>
</tr>
<tr class="odd">
<td>Biometric Information</td>
<td>An individual's physiological, biological, or behavioral
characteristics, including information pertaining to an individual's
deoxyribonucleic acid (DNA), that is used or is intended to be used
singly or in combination with each other or with other identifying data,
to establish individual identity. Biometric information includes, but is
not limited to, imagery of the iris, retina, fingerprint, face, hand,
palm, vein patterns, and voice recordings, from which an identifier
template, such as a faceprint, a minutiae template, or a voiceprint, can
be extracted, and keystroke patterns or rhythms, gait patterns or
rhythms, and sleep, health, or exercise data that contain identifying
information.</td>
</tr>
<tr class="even">
<td>Loan Services</td>
<td>The mortgage services will be referred to as “Loan Services” and
together with other services - the “Services”</td>
</tr>
</tbody>
</table>
<ol start="2" type="1">
<li><p><strong>Personal Information We Collect About You.</strong> We
may collect and use the following personal information, including
sensitive personal information, that identifies, relates to, describes,
is reasonable capable of being associated with, or could reasonably be
linked, directly or indirectly, with a particular consumer or
household:</p></li>
</ol>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Categories of Personal Information</strong></td>
<td><strong>Specific Types of Personal Information
Collected</strong></td>
</tr>
<tr class="even">
<td>Identifiers</td>
<td>Name, online identifier, Internet Protocol address, and if provided
and useful for a transaction: full name, alias, postal address, unique
personal identifier, email address, account name, social security
number, driver’s license number, passport number, or other similar
identifiers.</td>
</tr>
<tr class="odd">
<td>Information that identifies, relates to, describes, or is capable of
being associated with, a particular individual, including, but not
limited to, his or her name, signature, social security number, physical
characteristics or description, address, telephone number, passport
number, driver’s license or state identification card number, insurance
policy number, education, employment, employment history, bank account
number, credit card number, debit card number, household income and
expenses, financial account details, payment card information,
outstanding debt, demographic information, and other information related
to funding availability, any other financial information, medical
information, or health insurance information. Property Information, such
as addresses, prices, photos, and other information about the properties
you own or consider financing.</td>
<td>No information in this category unless voluntarily provided by you
or authorized by you to be obtained from third-parties, and beneficial
in the use of our services.</td>
</tr>
<tr class="even">
<td>Account log-in, financial account, debit card, or credit card number
in combination with any required security or access code, password, or
credentials allowing access to an account</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="odd">
<td>Characteristics of protected classifications under California or
federal law.</td>
<td>No additional information in this category unless voluntarily
provided by you and beneficial in the use of our services.</td>
</tr>
<tr class="even">
<td>Commercial information (e.g., records of personal property, products
or services purchased, obtained, or considered, or other purchasing or
consuming histories or tendencies)</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="odd">
<td>Biometric information</td>
<td>No information in this category.</td>
</tr>
<tr class="even">
<td>Internet or other electronic network activity information (e.g.,
browsing history, search history, and information regarding a consumer’s
interaction with an Internet Web site, application, or
advertisement)</td>
<td>No information in this category.</td>
</tr>
<tr class="odd">
<td>Geolocation data</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="even">
<td>Audio, electronic, visual, thermal, olfactory, or similar
information</td>
<td>No information in this category.</td>
</tr>
<tr class="odd">
<td>Professional or employment-related information</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="even">
<td>Education information, defined as information that is not publicly
available personally identifiable information as defined in the Family
Educational Rights and Privacy Act (FERPA)</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="odd">
<td>Inferences drawn from any of the information identified above to
create a profile about a consumer reflecting the consumer’s preferences,
characteristics, psychological trends, predispositions, behavior,
attitudes, intelligence, abilities, and aptitudes</td>
<td>We may use any of the information identified above to draw
inferences about the commercial appropriateness of any brokerage,
administrative, ministerial and/ or financial services provided to you
by us. We do not broker, market, or offer you any additional or third
party services to you based on our inferences other than those services
specifically listed on our website and platforms.</td>
</tr>
<tr class="even">
<td>Racial or ethnic origin, religious or philosophical beliefs, or
union membership</td>
<td>No information in this category unless voluntarily provided by you
and beneficial in the use of our services.</td>
</tr>
<tr class="odd">
<td>Contents of a consumer’s mail, email, and text messages unless the
business is the intended recipient of the communication</td>
<td>No information.</td>
</tr>
<tr class="even">
<td>Genetic data</td>
<td>No information.</td>
</tr>
<tr class="odd">
<td>Processing of biometric information for the purpose of uniquely
identifying a consumer</td>
<td>No information.</td>
</tr>
<tr class="even">
<td>Health information</td>
<td>No information.</td>
</tr>
<tr class="odd">
<td>Sex life or sexual orientation</td>
<td>No information.</td>
</tr>
<tr class="even">
<td>Additional Information We Collect from Others</td>
<td>We obtain information from our mortgage partner, Embed Inc. and
third-party services and organizations with respect to your mortgage
loan application and purchased property/property of interest. This
information may include the following: your loan application status,
your pre-approval amount, your loan, amount, loan rate and other loan
terms, your borrowers’ and co-borrowers’ information, information of
other property owners not in the loan application, information of the
subject property, property purchase price, your loan team, escrow and
title professionals and the real estate agents in your purchase
transaction.</td>
</tr>
</tbody>
</table>
<blockquote>
<p>If you do not provide personal information required to provide
products AND/OR services to you, unfortunately it may delay or prevent
us from providing products AND/OR services to you.</p>
</blockquote>
<ol start="3" type="1">
<li><p><strong>How Your Personal Information is Collected.</strong> We
collect personal information from the following categories of
sources:</p></li>
</ol>
<ul>
<li><p>You, directly in person, by telephone, text, or email and/or via
our website, the Housewell platform related and applications which you
access in conjunction with using our services.</p></li>
<li><p>Third party with your consent (e.g., your bank)</p></li>
<li><p>Advertising networks</p></li>
<li><p>Internet service providers</p></li>
<li><p>Data analytics providers</p></li>
<li><p>Government entities</p></li>
<li><p>Operating systems and platforms</p></li>
<li><p>Social networks</p></li>
<li><p>Data brokers</p></li>
<li><p>Publicly accessible sources (e.g., property records)</p></li>
<li><p>Cookies on our website</p></li>
<li><p>Our IT and security systems, including:</p></li>
</ul>
<ul>
<li><p>Door entry systems and reception logs</p></li>
<li><p>Automated monitoring of our websites and other technical systems,
such as our computer networks and connections, CCTV and access control
systems, communications systems, email, and instant messaging systems
–and–</p></li>
<li><p>any other relevant systems if applicable</p></li>
</ul>
<ol start="4" type="1">
<li><p><strong>How and Why We Use Your Personal Information.</strong>
Under data protection laws, we can only use your personal information if
we have a proper reason for doing so, for example:</p></li>
</ol>
<ul>
<li><p>To comply with our legal and regulatory obligations</p></li>
<li><p>For the performance of our contract with you or to take steps at
your request before entering into a contract</p></li>
<li><p>For our legitimate interests or those of a third party
–or–</p></li>
<li><p>Where you have given consent</p></li>
</ul>
<blockquote>
<p>A legitimate interest is when we have a business or commercial reason
to use your information, so long as this is not overridden by your own
rights and interests.</p>
<p>The table below explains what we use (process) your personal
information for and our reasons for doing so:</p>
</blockquote>
<table>
<colgroup>
<col style="width: 49%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>What we use your personal information for</strong></td>
<td><strong>Our reasons</strong></td>
</tr>
<tr class="even">
<td>To provide products AND/OR services to you</td>
<td>For the performance of our contract with you or to take steps at
your request before entering into a contract</td>
</tr>
<tr class="odd">
<td>To prevent and detect fraud against you or us</td>
<td>For our legitimate interests or those of a third party, i.e., to
minimize fraud that could be damaging for us and for you</td>
</tr>
<tr class="even">
<td><p>Conducting checks to identify our customers and verify their
identity</p>
<p>Screening for financial and other sanctions or embargoes</p>
<p>Other processing necessary to comply with professional, legal, and
regulatory obligations that apply to our business, e.g., under health
and safety regulation or rules issued by our professional
regulator</p></td>
<td>To comply with our legal and regulatory obligations such as
maintaining records for tax purposes or responding to awful requests
from law enforcement or regulatory agencies.</td>
</tr>
<tr class="odd">
<td>If necessary, for gathering and providing information required by or
relating to audits, inquiries or investigations by regulatory
bodies</td>
<td>To comply with our legal and regulatory obligations</td>
</tr>
<tr class="even">
<td>Ensuring business policies are adhered to, e.g., policies covering
security and internet use</td>
<td>For our legitimate interests or those of a third party, i.e., to
make sure we are following our own internal procedures so we can deliver
the best service to you</td>
</tr>
<tr class="odd">
<td>Operational reasons, such as improving efficiency, training, and
quality control</td>
<td>For our legitimate interests or those of a third party, i.e., to be
as efficient as we can so we can deliver the best service for you at the
best price</td>
</tr>
<tr class="even">
<td>Ensuring the confidentiality of commercially sensitive
information</td>
<td>For our legitimate interests or those of a third party, i.e., to
protect trade secrets and other commercially valuable information and to
comply with our legal and regulatory obligations</td>
</tr>
<tr class="odd">
<td>Statistical analysis to help us manage our business, e.g., in
relation to our financial performance, customer base, product range or
other efficiency measures</td>
<td><p>For our legitimate interests or those of a third party, i.e., to
be as efficient as we can so we can deliver the best service for you at
the best price</p>
<p>We may use your information to analyze customer behavior, evaluate
the effectiveness of our marketing strategies, and identify areas for
improvement in our products, services, or website.</p>
<p>Your information may be used to conduct research and develop new
products, services, or technologies.</p></td>
</tr>
<tr class="even">
<td>Preventing unauthorized access and modifications to systems</td>
<td><p>For our legitimate interests or those of a third party, i.e., to
prevent and detect criminal activity that could be damaging for us and
for you</p>
<p>To comply with our legal and regulatory obligations</p></td>
</tr>
<tr class="odd">
<td>Updating and enhancing customer records</td>
<td><p>For the performance of our contract with you or to take steps at
your request before entering into a contract</p>
<p>To comply with our legal and regulatory obligations</p>
<p>For our legitimate interests or those of a third party, e.g., making
sure that we can keep in touch with our customers about existing orders
and new products</p></td>
</tr>
<tr class="even">
<td>Statutory returns</td>
<td>To comply with our legal and regulatory obligations</td>
</tr>
<tr class="odd">
<td>Customer Support</td>
<td>We may use your information to respond to customer inquiries,
provide assistance, or troubleshoot issues related to products or
services.</td>
</tr>
<tr class="even">
<td>Mergers and Acquisitions</td>
<td>In the event of a business merger, acquisition, or sale, your
information may be transferred to the acquiring or resulting entity as
part of the transaction.</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Ensuring safe working practices, staff administration and
assessments</td>
<td><p>To comply with our legal and regulatory obligations</p>
<p>For our legitimate interests or those of a third party, e.g., to make
sure we are following our own internal procedures and working
efficiently so we can deliver the best service to you</p></td>
</tr>
<tr class="odd">
<td><p>Marketing and telephonic communications regarding our services
and those of selected third parties to:</p>
<ul>
<li><p>Existing and former customers</p></li>
<li><p>Third parties who have previously expressed an interest in our
services</p></li>
<li><p>Third parties with whom we have had no previous dealings</p></li>
</ul></td>
<td><p>For our legitimate interests or those of a third party affiliate,
i.e., to promote our business to existing and former customers</p>
<p>We may use your information to market our Services to you. This may
include sending you communications about our Services, features,
promotions, surveys, news, updates, and events, and managing your
participation in these promotions and events.</p>
<p>We may use your information to contact you by telephone for any
purpose described above, including marketing. By providing us a
telephone number, you are providing express written permission and
consent for us to contact you at that phone number at any time, for any
lawful purpose.</p>
<p>The ways in which we may contact you include live operator, automatic
telephone dialing system (auto-dialer), prerecorded and artificial voice
message, or text/SMS. Phone numbers you provide include those you give
to us and those from which you, or someone acting on your behalf,
contact us. You may revoke your authorization for some, but not all,
types and forms of communications. If you would like to revoke your
consent to receive marketing calls or text messages and/or automated
calls or text messages, email us at support@housewell.com</p></td>
</tr>
<tr class="even">
<td>When applicable, credit reference checks via external credit
reference agencies</td>
<td>For our legitimate interests or those of a third party, i.e., to
ensure our customers are likely to be able to pay for our products and
services</td>
</tr>
<tr class="odd">
<td>External audits and quality checks, e.g., for ISO or Investors in
People accreditation and the audit of our accounts</td>
<td><p>For our legitimate interests or a those of a third party, i.e.,
to maintain our accreditations so we can demonstrate we operate at the
highest standards</p>
<p>To comply with our legal and regulatory obligations</p></td>
</tr>
</tbody>
</table>
<blockquote>
<p>For EEA Data Subjects: The above table does not apply to special
category personal information, which we will only process with your
explicit consent.</p>
</blockquote>
<ol start="5" type="1">
<li><p><strong>EEA Data Subjects: Promotional Communications.</strong>
We may use your personal information to send you updates (by email, text
message, telephone, or post) about our products AND/OR services,
including exclusive offers, promotions or new products AND/OR
services.</p></li>
</ol>
<blockquote>
<p>We have a legitimate interest in processing your personal information
for promotional purposes (see above “How and why we use your personal
information”). This means we do not usually need your consent to send
you promotional communications. However, where consent is needed, we
will ask for this consent separately and clearly.</p>
<p>We will always treat your personal information with the utmost
respect and never sell OR share it with other organizations outside the
Housewell family for marketing purposes.</p>
<p>You have the right to opt out of receiving promotional communications
at any time by:</p>
</blockquote>
<ul>
<li><p>Contacting us at support@housewell.com</p></li>
<li><p>Using the “unsubscribe” link in emails or “STOP” number in texts
or</p></li>
</ul>
<blockquote>
<p>We may ask you to confirm or update your marketing preferences if you
instruct us to provide further products AND/OR services in the future,
or if there are changes in the law, regulation, or the structure of our
business.</p>
</blockquote>
<ol start="6" type="1">
<li><p><strong>Who We Share Your Personal Information With.</strong> We
routinely share personal information with:</p></li>
</ol>
<ul>
<li><p>Our affiliates, including companies within the Housewell family
of companies, and with Embed Inc. dba Pylon, Pylon Lending, our
non-affiliated mortgage partner (“Pylon”). We share your information
with Pylon for the processing and origination of your loan. By creating
your account on our mortgage platform you are providing us with your
express consent to share your information with Pylon. Please note:</p>
<ul>
<li><p>Pylon and we are not engaged in joint marketing
activities</p></li>
<li><p>Pylon and we share consumers’ information for marketing purposes
as described herein</p></li>
<li><p>Pylon and we do not share consumers’ information with
affiliates</p></li>
<li><p>Pylon and we share consumers’ information with nonaffiliates
(with one another and service providers)</p></li>
</ul></li>
<li><p>Service providers we use to help deliver our products and/or
services to you, such as payment service providers, warehouses, and
delivery companies</p></li>
<li><p>Other third parties we use to help us run our business, such as
marketing agencies or website hosts</p></li>
<li><p>Financial Institutions. We may share your information with
financial institutions to process payments you have authorized.</p></li>
<li><p>Third parties approved by you, including social media sites you
choose to link your account to or third-party payment providers</p></li>
<li><p>Credit reporting agencies</p></li>
<li><p>Our insurers and brokers</p></li>
<li><p>Our bank(s)</p></li>
</ul>
<blockquote>
<p>We only allow our service providers to handle your personal
information if we are satisfied they take appropriate measures to
protect your personal information. We also impose contractual
obligations on service providers relating to ensure they can only use
your personal information to provide services to us and to you. We may
also share personal information with external auditors, e.g., in
relation to ISO accreditation and the audit of our accounts.</p>
<p>We may disclose and exchange information with law enforcement
agencies and regulatory bodies to comply with our legal and regulatory
obligations.</p>
<p>We may also need to share some personal information with other
parties, such as potential buyers of some or all of our business or
during a re-structuring. We will typically anonymize information, but
this may not always be possible. The recipient of the information will
be bound by confidentiality obligations.</p>
<p>We will not share your personal information with any other third
party.</p>
</blockquote>
<ol start="7" type="1">
<li><p><strong>Personal Information We Sold or Shared.</strong> In light
of Section 6, in the preceding 12 months, we may have sold or shared the
following categories of personal information:</p></li>
</ol>
<ul>
<li><p>Identifiers (e.g., a real name, alias, postal address, unique
personal identifier, online identifier, Internet Protocol address, email
address, account name, social security number, driver’s license number,
passport number, or other similar identifiers)</p></li>
<li><p>Information that identifies, relates to, describes, or is capable
of being associated with, a particular individual, including, but not
limited to, his or her name, signature, social security number, physical
characteristics or description, address, telephone number, passport
number, driver’s license or state identification card number, insurance
policy number, education, employment, employment history, bank account
number, credit card number, debit card number, or any other financial
information, medical information, or health insurance
information</p></li>
<li><p>Characteristics of protected classifications under California or
federal law</p></li>
<li><p>Commercial information (e.g., records of personal property,
products or services purchased, obtained, or considered, or other
purchasing or consuming histories or tendencies)</p></li>
<li><p>Biometric information</p></li>
<li><p>Internet or other electronic network activity information (e.g.,
browsing history, search history, and information regarding a consumer’s
interaction with an Internet Web site, application, or
advertisement)</p></li>
<li><p>Geolocation data</p></li>
<li><p>Audio, electronic, visual, thermal, olfactory, or similar
information</p></li>
<li><p>Professional or employment-related information</p></li>
<li><p>Education information, defined as information that is not
publicly available personally identifiable information as defined in the
Family Educational Rights and Privacy Act (FERPA) –and–</p></li>
<li><p>Inferences drawn from any of the information identified above to
create a profile about a consumer reflecting the consumer’s preferences,
characteristics, psychological trends, predispositions, behavior,
attitudes, intelligence, abilities, and aptitudes</p></li>
</ul>
<ol start="8" type="1">
<li><p><strong>Categories of Personal Information We May Have Disclosed
for a Business Purpose.</strong> In the preceding 12 months, we may have
disclosed the following categories of personal information for a
business purpose:</p></li>
</ol>
<ul>
<li><p>Identifiers (e.g., a real name, alias, postal address, unique
personal identifier, online identifier, Internet Protocol address, email
address, account name, social security number, driver's license number,
passport number, or other similar identifiers)</p></li>
<li><p>Information that identifies, relates to, describes, or is capable
of being associated with, a particular individual, including, but not
limited to, his or her name, signature, social security number, physical
characteristics or description, address, telephone number, passport
number, driver's license or state identification card number, insurance
policy number, education, employment, employment history, bank account
number, credit card number, debit card number, or any other financial
information, medical information, or health insurance
information</p></li>
<li><p>Characteristics of protected classifications under California or
federal law</p></li>
<li><p>Commercial information (e.g., records of personal property,
products or services purchased, obtained, or considered, or other
purchasing or consuming histories or tendencies)</p></li>
<li><p>Biometric information</p></li>
<li><p>Internet or other electronic network activity information (e.g.,
browsing history, search history, and information regarding a consumer's
interaction with an Internet Web site, application, or
advertisement)</p></li>
<li><p>Geolocation data</p></li>
<li><p>Audio, electronic, visual, thermal, olfactory, or similar
information</p></li>
<li><p>Professional or employment-related information</p></li>
<li><p>Education information, defined as information that is not
publicly available personally identifiable information as defined in the
Family Educational Rights and Privacy Act (FERPA)</p></li>
<li><p>Inferences drawn from any of the information identified above to
create a profile about a consumer reflecting the consumer's preferences,
characteristics, psychological trends, predispositions, behavior,
attitudes, intelligence, abilities, and aptitudes –and–</p></li>
<li><p>Sensitive personal information</p></li>
</ul>
<ol start="9" type="1">
<li><p><strong>How Long Your Personal Information Will Be Kept.</strong>
We will keep your personal information while you have an account with us
or while we are providing products AND/OR services to you. Thereafter,
we will keep your personal information for as long as is
necessary:</p></li>
</ol>
<ul>
<li><p>To respond to any questions, complaints or claims made by you or
on your behalf,</p></li>
<li><p>To show that we treated you fairly –or–</p></li>
<li><p>To keep records required by law.</p></li>
</ul>
<blockquote>
<p>We will not retain your personal information for longer than
necessary for the purposes set out in this policy. Different retention
periods apply for different types of personal information.</p>
<p>When and if it is no longer necessary to retain your personal
information, we will delete or anonymize it.</p>
</blockquote>
<ol start="10" type="1">
<li><p><strong>California Consumers: Your Rights Under the
CCPA/CPRA.</strong> You have the right under the California Consumer
Privacy Act of 2018 (CCPA), as amended by the California Privacy Rights
Act of 2020 (CPRA), and certain other privacy and data protection laws,
as applicable, to exercise free of charge:</p></li>
</ol>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Disclosure of Personal Information We Collect About You</td>
<td><p>You have the right to know, and request disclosure of:</p>
<ul>
<li><p>The categories of personal information we have collected about
you, including sensitive personal information</p></li>
<li><p>The categories of sources from which the personal information is
collected</p></li>
<li><p>The categories of third parties to whom we disclose personal
information, if any –and–</p></li>
<li><p>The specific pieces of personal information we have collected
about you</p></li>
</ul>
<p>Please note that we are not required to:</p>
<ul>
<li><p>Retain any personal information about you that was collected for
a single one-time transaction if, in the ordinary course of business,
that information about you is not retained</p></li>
<li><p>Reidentify or otherwise link any data that, in the ordinary
course of business, is not maintained in a manner that would be
considered personal information –or–</p></li>
<li><p>Provide the personal information to you more than twice in a
12-month period</p></li>
</ul></td>
</tr>
<tr class="even">
<td>Disclosure of Personal Information Sold, Shared, or Disclosed for a
Business Purpose</td>
<td><p>In connection with any personal information we may sell, share,
or disclose to a third party for a business purpose, you have the right
to know:</p>
<ul>
<li><p>The categories of personal information about you that we sold or
shared and the categories of third parties to whom the personal
information was sold or shared –and–</p></li>
<li><p>The categories of personal information that we disclosed about
you for a business purpose and the categories of persons to whom the
personal information was disclosed for a business purpose</p></li>
</ul>
<p>You have the right to opt-out of the sale of your personal
information or sharing of your personal information for the purpose of
targeted behavioral advertising. If you exercise your right to opt-out
of the sale or sharing of your personal information, we will refrain
from selling or sharing your personal information, unless you
subsequently provide express authorization for the sale or sharing of
your personal information.</p>
<p><strong>To opt-out of the sale or sharing of your personal
information, visit our homepage and click on the Do Not Sell or Share My
Personal Information link here: <a
href="http://housewell.com/limit-do-not-share">housewell.com/limit-do-not-share</a></strong></p></td>
</tr>
<tr class="odd">
<td>Right to Limit Use of Sensitive Personal Information</td>
<td><p>You have the right to limit the use and disclosure of your
sensitive personal information to the use which is necessary to:</p>
<ul>
<li><p>Perform the services or provide the goods reasonably expected by
an average consumer who requests those goods or services</p></li>
<li><p>To perform the following services: (1) Helping to ensure security
and integrity to the extent the use of the consumer's personal
information is reasonably necessary and proportionate for these
purposes; (2) Short-term, transient use, including, but not limited to,
non-personalized advertising shown as part of a consumer's current
interaction with the business, provided that the consumer's personal
information is not disclosed to another third party and is not used to
build a profile about the consumer or otherwise alter the consumer's
experience outside the current interaction with the business; (3)
Performing services on behalf of the business, including maintaining or
servicing accounts, providing customer service, processing or fulfilling
orders and transactions, verifying customer information, processing
payments, providing financing, providing analytic services, providing
storage, or providing similar services on behalf of the business; and
(4) Undertaking activities to verify or maintain the quality or safety
of a service or device that is owned, manufactured, manufactured for, or
controlled by the business, and to improve, upgrade, or enhance the
service or device that is owned, manufactured, manufactured for, or
controlled by the business –and–</p></li>
<li><p>As authorized by further regulations</p></li>
</ul>
<p>You have a right to know if your sensitive personal information may
be used, or disclosed to a service provider or contractor, for
additional, specified purposes.</p>
<p><strong>To limit the use of your sensitive personal information,
visit our homepage and click on the "Limit the Use of My Sensitive
Personal Information" link here: <a
href="http://housewell.com/limit-do-not-share">housewell.com/limit-do-not-share</a></strong></p></td>
</tr>
<tr class="even">
<td>Right to Deletion</td>
<td><p>Subject to certain exceptions set out below, on receipt of a
verifiable request from you, we will:</p>
<ul>
<li><p>Delete your personal information from our records –and–</p></li>
<li><p>Delete your personal information from our records –and–</p></li>
<li><p>Direct third parties to whom the business has sold or shared your
personal information to delete your personal information unless this
proves impossible or involves disproportionate effort</p></li>
</ul>
<p>Please note that we may not delete your personal information if it is
reasonably necessary to:</p>
<ul>
<li><p>Complete the transaction for which the personal information was
collected, fulfill the terms of a written warranty or product recall
conducted in accordance with federal law, provide a good or service
requested by you, or reasonably anticipated within the context of our
ongoing business relationship with you, or otherwise perform a contract
between you and us</p></li>
<li><p>Help to ensure security and integrity to the extent the use of
the consumer's personal information is reasonably necessary and
proportionate for those purposes</p></li>
<li><p>Debug to identify and repair errors that impair existing intended
functionality</p></li>
<li><p>Exercise free speech, ensure the right of another consumer to
exercise his or her right of free speech, or exercise another right
provided for by law</p></li>
<li><p>Comply with the California Electronic Communications Privacy
Act</p></li>
<li><p>Engage in public or peer-reviewed scientific, historical, or
statistical research in the public interest that adheres to all other
applicable ethics and privacy laws, when our deletion of the information
is likely to render impossible or seriously impair the achievement of
such research, provided we have obtained your informed consent</p></li>
<li><p>Enable solely internal uses that are reasonably aligned with your
expectations based on your relationship with us</p></li>
<li><p>Comply with an existing legal obligation –or–</p></li>
<li><p>Otherwise use your personal information, internally, in a lawful
manner that is compatible with the context in which you provided the
information</p></li>
</ul></td>
</tr>
<tr class="odd">
<td>Right of Correction</td>
<td>If we maintain inaccurate personal information about you, you have
the right to request us to correct that inaccurate personal information.
Upon receipt of a verifiable request from you, we will use commercially
reasonable efforts to correct the inaccurate personal information.</td>
</tr>
<tr class="even">
<td>Protection Against Retaliation</td>
<td><p>You have the right to not be retaliated against by us because you
exercised any of your rights under the CCPA/CPRA. This means we cannot,
among other things:</p>
<ul>
<li><p>Deny goods or services to you</p></li>
<li><p>Charge different prices or rates for goods or services, including
through the use of discounts or other benefits or imposing
penalties</p></li>
<li><p>Provide a different level or quality of goods or services to you
–or–</p></li>
<li><p>Suggest that you will receive a different price or rate for goods
or services or a different level or quality of goods or
services</p></li>
</ul>
<p>Please note that we may charge a different price or rate or provide a
different level or quality of goods and/or services to you, if that
difference is reasonably related to the value provided to our business
by your personal information. We may also offer loyalty, rewards,
premium features, discounts, or club card programs consistent with these
rights or payments as compensation, for the collection of personal
information, the sale of personal information, or the retention of
personal information.</p></td>
</tr>
</tbody>
</table>
<ol start="11" type="1">
<li><p><strong>EEA Data Subjects: Your Rights Under the EU
GDPR.</strong></p></li>
</ol>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Right to Be Informed</td>
<td>The right to know or be notified about the collection and use of
your personal information.</td>
</tr>
<tr class="even">
<td>Right to Access</td>
<td>The right to be provided with a copy of your personal information
(the right of access)</td>
</tr>
<tr class="odd">
<td>Right to Rectification</td>
<td>The right to require us to correct any mistakes in your personal
information</td>
</tr>
<tr class="even">
<td>Right to be Forgotten</td>
<td>The right to require us to delete your personal information—in
certain situations</td>
</tr>
<tr class="odd">
<td>Right to Restriction of Processing</td>
<td>The right to require us to restrict processing of your personal
information—in certain circumstances, e.g., if you contest the accuracy
of the data</td>
</tr>
<tr class="even">
<td>Right to Data Portability</td>
<td>The right to receive the personal information you provided to us, in
a structured, commonly used, and machine-readable format and/or transmit
that data to a third party—in certain situations</td>
</tr>
<tr class="odd">
<td>Right to Object</td>
<td><p>The right to object:</p>
<ul>
<li><p>At any time to your personal information being processed for
direct marketing (including profiling)</p></li>
<li><p>In certain other situations to our continued processing of your
personal information, e.g., processing carried out for the purpose of
our legitimate interests</p></li>
</ul></td>
</tr>
<tr class="even">
<td>Right Not to be Subject to Automated Individual Decision-Making</td>
<td>The right not to be subject to a decision based solely on automated
processing (including profiling) that produces legal effects concerning
you or similarly significantly affects you</td>
</tr>
</tbody>
</table>
<blockquote>
<p>For further information on each of those rights, including the
circumstances in which they apply, see the guidance from the UK
Information Commissioner's Office (ICO) on individual rights under the
EU General Data Protection Regulation.</p>
</blockquote>
<ol start="12" type="1">
<li><p><strong>How to Exercise Your Rights.</strong> If you would like
to exercise any of your rights as described in this Privacy Policy, you
can do so here: housewell.com/limit-do-not-share You may also call us at
678-602-9511 or email us at support@housewell.com Parker to provide this
information.</p></li>
</ol>
<ul>
<li><p>Please note, due to the nature of services we provide, the
analytical and fraud prevention requirements necessary to provide these
services, and the nature of the real estate and financial industries in
general, in the if we are required to delete or return certain data,
then we may not be able to provide you with certain services and inform
you accordingly.</p></li>
<li><p>Please note that you may only make a CCPA/CPRA-related data
access or data portability disclosure request twice within a 12-month
period.</p></li>
<li><p>If you choose to contact us directly by [website/email/phone/in
writing], you will need to provide us with:</p></li>
</ul>
<ul>
<li><p>Enough information to identify you (e.g., your full name, address
and customer or matter reference number)</p></li>
<li><p>Proof of your identity and address (e.g., a copy of your driving
license or passport and a recent utility or credit card bill)
–and–</p></li>
<li><p>A description of what right you want to exercise and the
information to which your request relates</p></li>
</ul>
<ul>
<li><p>We are not obligated to make a data access or data portability
disclosure if we cannot verify that the person making the request is the
person about whom we collected information or is someone authorized to
act on such person's behalf.</p></li>
<li><p>Any personal information we collect from you to verify your
identity in connection with you request will be used solely for the
purposes of verification.</p></li>
</ul>
<ol start="13" type="1">
<li><p><strong>EEA Data Subjects: Where Your Personal Information is
Held.</strong> Information may be held at our offices and those of our
group companies, third party agencies, service providers,
representatives and agents as described above (see above: “Who We Share
Your Personal Information with”).</p></li>
</ol>
<blockquote>
<p>Some of these third parties may be based outside the European
Economic Area. For more information, including on how we safeguard your
personal information when this occurs, see below: “Transferring Your
Personal Information Out of the EEA.”</p>
</blockquote>
<ol start="14" type="1">
<li><p><strong>EEA Data Subjects: Transferring Your Personal Information
Out of the EEA.</strong> To deliver services to you, it is sometimes
necessary for us to share your personal information outside the European
Economic Area (EEA), e.g.:</p></li>
</ol>
<ul>
<li><p>With our offices outside the EEA in the US</p></li>
<li><p>With your and our service providers located outside the
EEA</p></li>
<li><p>If you are based outside the EEA –or–</p></li>
<li><p>Where there is an international dimension to the services we are
providing to you</p></li>
</ul>
<blockquote>
<p>These transfers are subject to special rules under European and UK
data protection law.</p>
<p>The US is a non-EEA countries and certain States within the US and
the US as a whole does not have the same data protection laws as the
United Kingdom and EEA. We will, however, ensure the transfer complies
with data protection law and all personal information will be secure.
Our standard practice is to use standard data protection contract
clauses that have been approved by the European Commission.</p>
<p>If you would like further information, please contact our Data
Protection Officer (see “How To Contact Us” below).</p>
</blockquote>
<ol start="15" type="1">
<li><p><strong>Keeping Your Personal Information Secure.</strong> We
have appropriate security measures in place to prevent personal
information from being accidentally lost or used or accessed in an
unauthorized way. We limit access to your personal information to those
who have a genuine business need to access it. Those processing your
information will do so only in an authorized manner and are subject to a
duty of confidentiality. We also have procedures in place to deal with
any suspected data security breach. We will notify you and any
applicable regulator of a suspected data security breach where we are
legally required to do so.</p></li>
</ol>
<blockquote>
<p>If you want detailed information from Get Safe Online on how to
protect your information and your computers and devices against fraud,
identity theft, viruses, and many other online problems, please visit
www.getsafeonline.org. Get Safe Online is supported by HM Government and
leading businesses.</p>
</blockquote>
<ol start="16" type="1">
<li><p><strong>EEA Data Subjects: How to File a GDPR Complaint.</strong>
We hope that [we OR our Data Protection Officer] can resolve any query
or concern you raise about our use of your information.</p></li>
</ol>
<p>The General Data Protection Regulation also gives you right to lodge
a complaint with a supervisory authority, in the European Union (or
European Economic Area) state where you work, normally live, or where
any alleged infringement of data protection laws occurred.</p>
<ol start="17" type="1">
<li><p><strong>Changes to This Privacy Notice.</strong> This privacy
notice was published on 12/20/2023 and last updated on
12/20/2023.</p></li>
</ol>
<blockquote>
<p>We may change this privacy notice from time to time–when we do, we
will inform you via our website.</p>
</blockquote>
<ol start="18" type="1">
<li><p><strong>How to Contact Us.</strong> Please contact our Data
Protection Officer by post, email or telephone if you have any questions
about this privacy policy or the information we hold about you.</p></li>
</ol>
<blockquote>
<p>Our contact details are shown below:</p>
</blockquote>
<table>
<colgroup>
<col style="width: 49%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Our contact details</td>
<td>Our Data Protection Officer's contact details</td>
</tr>
<tr class="even">
<td>580 Marsh Park Drive Duluth, Georgia</td>
<td>580 Marsh Park Drive Duluth, Georgia</td>
</tr>
<tr class="odd">
<td>support@housewell.com</td>
<td><a href="mailto:parker@housewell.com">parker@housewell.com</a></td>
</tr>
<tr class="even">
<td>678-602-9511</td>
<td>678-602-9511</td>
</tr>
</tbody>
</table>
<ol start="19" type="1">
<li><p><strong>Do You Need Extra Help?</strong> If you would like this
notice in another format (for example: audio, large print, braille)
please contact us (see “How to contact us” above).</p></li>
</ol>
</body>
</html>
`

const RawPPHTMLComponent = () => {
    return <div dangerouslySetInnerHTML={{ __html: rawhtml }} />
  };
  
  export default RawPPHTMLComponent;