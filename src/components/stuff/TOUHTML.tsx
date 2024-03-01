
const rawhtml = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>123</title>
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
<p><strong><span class="smallcaps">Website Terms of
Use</span></strong></p>
<p><strong>TERMS AND CONDITIONS OF USE</strong></p>
<p>Welcome to our website. This site is maintained as a service to our
customers. By using this site, you agree to comply with and be bound by
the following terms and conditions of use. Please review these terms and
conditions carefully. If you do not agree to these terms and conditions,
you should not use this site. By clicking an "I Accept" button or
otherwise using the Service, you represent that you have read and
understand these Terms, are over the age of 18 (or older if required by
law), and are either consenting to be legally bound by these Terms on
your own behalf or on behalf of a company as an authorized
representative. If you are consenting on behalf of a company, you
further represent that you have the authority to bind the company to
these Terms and that the company agrees to be legally bound by these
Terms. If you do not agree to these Terms or cannot make these
representations, you do not have our permission to use the Service.</p>
<ol type="1">
<li><p><strong>Agreement.</strong> This Term of Use agreement ("the
"Agreement") specifies the Terms and Conditions for access to and use of
Housewell.com the "Site") and describe the terms and conditions
applicable to your access of and use of the Site. This Agreement may be
modified at any time by Housewell Technologies, Inc. or its affiliated
group of companies ( “us”, “we”, “our” as the case may be) upon posting
of the modified Agreement. Any such modifications shall be effective
immediately. You can view the most recent version of these terms at any
time at https://housewell.com/terms-of-use Each use by you shall
constitute and be deemed your unconditional acceptance of this
Agreement.</p></li>
<li><p><strong>THIS AGREEMENT CONTAINS AN AGREEMENT TO ARBITRATE (SEE
SECTION 4) ALL CLAIMS AND ALSO CONTAINS DISCLAIMERS OF WARRANTIES AND
LIABILITY. IF YOU DO NOT AGREE WITH THE TERMS AND CONDITIONS OF THIS
AGREEMENT AND OUR PRIVACY POLICY (SEE LINK BELOW), PLEASE DO NOT ACCESS
OR USE THIS SITE.</strong></p></li>
<li><p><strong>Privacy.</strong> Your visit to our site is also governed
by our Privacy Policy. Please review our Privacy Policy at
https://housewell.com/privacy-policy.</p></li>
<li><p><strong>Arbitration Notice:</strong> You and we agree that any
disputes arising under these Terms will be resolved through binding,
individual arbitration, and that by accepting these Terms, each of us is
waiving our right to a trial by jury or to participate in any class
action or representative proceeding. You agree to give up your right to
go to court to assert or defend your rights under this contract (except
for matters that may be taken to small claims court). Your rights will
be determined by a neutral arbitrator, not a judge or jury.</p></li>
<li><p><strong>Access requirements:</strong> To access most features of
our services, you must create an account. When creating your account,
you will be asked to provide some information about yourself, such as
your email address, home address, and a valid, government-issued photo
ID. You must keep your account information accurate and up-to-date. You
are responsible for maintaining the confidentiality of your account and
for restricting access to it. You are also responsible for all
activities that occur in your account or under your access credentials.
If you believe that your account has been accessed without your
permission, you must immediately notify us at [email address]. We are
not responsible for any loss or damage arising from your failure to
comply with this requirement or for any third-party access to your
account that results from theft or misappropriation of your
account.</p></li>
<li><p><strong>Payments and Authorization for Service Fees.</strong>
Some features of the Service may require you to pay service fees. All
fees are in US Dollars and are non-refundable. We may seek
pre-authorization of your credit card account before your purchase, and
may suspend or terminate access to our services for any account with
unpaid fees. Delinquent accounts will be charged with additional
fees.</p></li>
<li><p><strong>Use of Connected Third Party-</strong>
<strong>Services</strong>. We may provide tools that let you export
information to third-party services, such as your bank account. By using
these tools, you agree that we can share that information with the
authorized third-party service. We are not responsible for how
third-party services use your exported information. Any links to
third-party websites are not under our control and we not responsible
for the content of third-party websites. Our services may use
third-party software components that are free and allow users to copy,
modify, and distribute them. You can obtain these third-party components
under the applicable third-party licenses, and your use of those
components is governed by those licenses.</p></li>
<li><p><strong>Ownership.</strong> All content included on this Site is
and shall continue to be the property of Housewell Technologies, Inc.,
its affiliated group of companies or its content suppliers and is
protected under applicable copyright, patent, trademark, and other
proprietary rights. Any copying, redistribution, use or publication by
you of any such content or any part of the Site is prohibited, except as
expressly permitted in this Agreement. Under no circumstances will you
acquire any ownership rights or other interest in any content by or
through your use of this Site.</p></li>
<li><p><strong>User Provided Content:</strong> User Content: Certain
features of the Services allow users to upload and share content, such
as messages, data, text, images, files, links, information, contracts,
documents, materials, and other types of works (collectively, "User
Content"). You retain all copyright and other proprietary rights in your
User Content. By providing User Content to the Services, you grant us a
worldwide, non-exclusive, royalty-free license to host, store, transfer,
display, perform, reproduce, modify for formatting, and distribute your
User Content, in whole or in part, to provide the Services to you and
other authorized users. You also give us permission to share your User
Content with third parties you engage or wish to engage with, and any
service providers that participate in transactions you enter. You
represent and warrant that your User Content is true and accurate, and
that its use by us will not:</p>
<ol type="a">
<li><p>Infringe, violate, or misappropriate any third-party right,
including any copyright, trademark, patent, trade secret, moral right,
privacy right, right of publicity, or any other intellectual property or
proprietary right.</p></li>
<li><p>Slander, defame, libel, or invade the right of privacy,
publicity, or other property rights of any other person.</p></li>
<li><p>Cause us to violate any law or regulation.</p></li>
</ol></li>
<li><p><strong>Intended Audience.</strong> This website is intended for
adults only. This website is not intended for any children under the age
of 18 .</p></li>
<li><p><strong>Trademarks.</strong> The Housewell logos and others are
either trademarks or registered trademarks of Housewell Technologies,
Inc. or our affiliated companies. Other product and company names
mentioned on this Site may be trademarks of their respective
owners.</p></li>
<li><p><strong>Site Use.</strong> grants you a limited, revocable,
nonexclusive license to use this site solely for your own personal use
and not for republication, distribution, assignment, sublicense, sale,
preparation of derivative works, or other use. You agree not to copy
materials on the site, reverse engineer or break into the site, or use
materials, products or services in violation of any law. The use of this
website is at our discretion and we may terminate your use of this
website at any time.</p></li>
<li><p>Mobile Services: The Service includes certain services that may
be available via a mobile device, including (i) the ability to upload
content to the Service via a mobile device, (ii) the ability to browse
the Service and the Site from a mobile device, and (iii) the ability to
access certain features and content through Mobile Apps (collectively,
the “Mobile Services”). To the extent you access the Service through a
mobile device, your wireless service carrier’s standard charges, data
rates, and other fees may apply. In addition, downloading, installing,
or using certain Mobile Services may be prohibited or restricted by your
carrier, and not all Mobile Services may work with all carriers or
devices. By using the Services and providing us with your telephone
number(s), You are consenting to be contacted by us and our partners by
telephone (on a recorded line), automated calling, automated telephone
dialing system calling, automated system calling, artificial voice or
pre-recorded calling, text message, SMS and/or MMS message, fax, or
other telephonic or electronic means (“Communication Service”), even if
you have opted into and placed your telephone number(s) on the National
Do Not Call List, any state Do not Call List, or the internal Do Not
Call List of any company. You may be required to respond to an initial
call or message as instructed to complete your registration and confirm
enrollment in the Communication Service. You must consent to receive
calls or text messages from us and our partners, if applicable, in order
to use the Services. In the event you change or deactivate your
telephone number, you agree to promptly update your account information
to ensure that your messages are not sent to the person that acquires
your old telephone number. Please see our Web and Electronic Consent for
more information.</p></li>
</ol>
<blockquote>
<p>There is no additional charge for telephonic communications, but your
carrier’s standard message and data rates apply to any calls, text
messages, SMS or MMS messages you send or receive. Your carrier may
prohibit or restrict certain mobile features and certain mobile features
may be incompatible with your carrier or mobile device. We are not
liable for any delays in the receipt of, or any failures to receive, any
calls, text messages, SMS or MMS messages, as delivery is subject to
effective transmission by your mobile carrier and compatibility of your
mobile device. Please contact your mobile carrier if you have any
questions regarding these issues or your mobile data and messaging
plan.</p>
<p>By reply to any text, SMS or MMS message you receive from us, you may
text “STOP” to cancel or “HELP” for customer support information. If you
choose to cancel text, SMS or MMS messages from us, you agree to receive
a final message from us confirming your cancellation. Opting-out of
text, SMS or MMS messages is not optional with respect to active loan
applications started for your account.</p>
</blockquote>
<ol start="14" type="1">
<li><p><strong>Compliance with Laws.</strong> You agree to comply with
all applicable laws regarding your use of the website. You further
agreed that information provided by you is truthful and accurate to the
best of your knowledge. You also agree to use the Service in a lawful
manner and for lawful purposes only. You agree that our services may
only be used or exported in compliance with U.S. law. You acknowledge
and understand that we do not guarantee that the service is suitable,
available for use in all locations or that approval for any service is
guaranteed. You assume full responsibility for complying with applicable
laws. Please note that our services may be subject to U.S. export
controls, and it is prohibited to download, export, or re-export our
services: (i) to countries such as Burma (Myanmar), Cuba, Iran, North
Korea, Sudan, Syria, Libya, or any other country under U.S. trade
sanctions; or (ii) to individuals or entities listed on the U.S.
Treasury Department's Specially Designated Nationals and Blocked Persons
List or the U.S. Commerce Department's Denied Persons List or Entities
List, including those covered by General Order 3 (15 C.F.R Part 736,
Supplement 1) ("U.S Prohibited Party Lists"). By downloading any content
and/or using our service, you confirm and warrant that you are not: (A)
located in any of the aforementioned countries subject to U.S trade
sanctions or designated as "terrorist supporting" by the U.S government;
nor (B) listed on any of the U.S Prohibited Party Lists nor acting on
behalf of anyone included on such lists.</p></li>
<li><p><strong>Indemnification.</strong> You agree to indemnify, defend
and hold us and our partners, employees, and affiliates, harmless from
any liability, loss, claim and expense, including reasonable attorney's
fees, related to your violation of this Agreement or use of the Site. To
the maximum extent permitted by law, you bear full responsibility for
your use of the Service. You agree to defend, indemnify, and hold
harmless us, our affiliates, and our respective shareholders, directors,
managers, members, officers, employees, consultants, and agents
(referred to as "Housewell Entities") from any claims brought by a third
party. This includes all associated liability, damages, losses, and
expenses (including attorneys' fees and costs) arising out of or
connected with: (a) your unauthorized or improper use of the Service;
(b) your violation of any portion of these Terms or any referenced
representation, warranty or agreement contained herein; (c) infringement
upon any third-party rights including intellectual property rights,
publicity rights, confidentiality rights, other property rights or
privacy rights; or (d) any dispute or issue between you and any third
party. We reserve the right to assume exclusive defense and control over
any matter otherwise subject to indemnification by you at our own
expense. In such cases where we assume defense control, you agree to
cooperate fully with our defense efforts while still maintaining your
obligations for indemnification regarding that matter.</p></li>
<li><p><strong>Disclaimer.</strong> THE INFORMATION ON THIS SITE IS
PROVIDED ON AN "AS IS," "AS AVAILABLE" BASIS. YOU AGREE THAT USE OF THIS
SITE IS AT YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES OF ANY KIND,
INCLUDING BUT NOT LIMITED TO ANY EXPRESS WARRANTIES, STATUTORY
WARRANTIES, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE, AND NON-INFRINGEMENT. UNLESS OR UNTIL WE ENTER INTO
A BROKER-CLIENT RELATIONSHIP WITH YOU, THEN WE DO NOT ACT AS YOUR BROKER
AND DO NOT REPRESSENT YOU IN ANY TRANSACTIONS. ANY ADDITIONAL PRODUCTS
AND SERVICES WE OFFER THROUGH OUR SITE WILL BE SUBJECT TO ANY RELEVANT
TERMS FOR THOS SERVICE OFFERINGS. TO THE EXTENT YOUR JURISDICTION DOES
NOT ALLOW LIMITATIONS ON WARRANTIES, THIS LIMITATION MAY NOT APPLY TO
YOU. YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE OF THE SITE
SHALL BE TO DISCONTINUE USING THE SITE. Your possession, permitted
transfer, and use of the Service (including your account) are entirely
at your own risk. The Service and your account are provided on an "as
is" basis. To the maximum extent permitted by applicable law, we and all
Housewell Entities disclaim all warranties, whether express or implied.
These disclaimed warranties include but are not limited to:</p>
<ol type="a">
<li><p>Warranties of merchantability, quality, accuracy, title,</p></li>
<li><p>non-interference,</p></li>
<li><p>non-infringement,</p></li>
<li><p>and fitness for a particular purpose with respect to the Service
and your account.</p></li>
<li><p>Warranties that the Service and your account, as well as any data
processed through or using the Service, are secure, accurate, free from
bugs, viruses, interruption, errors, theft or destruction.</p></li>
</ol></li>
</ol>
<p>If any of these exclusions do not apply to you or are void under any
applicable law in relation to you:</p>
<p>Any warranty that cannot be excluded is limited to the shorter of:
(a) 30 days from the date of first delivery of the Service; or (b) the
shortest period permitted under applicable law.</p>
<p>We nor our affiliates, subsidiaries providers guarantee the accuracy,
adequacy, timeliness, reliability, completeness, suitability,
availability or usefulness of any services for any purpose. Each person
mentioned above disclaims liability for errors or omissions in relation
to these services. None of these services constitute an offer to sell or
a solicitation of an offer to buy/sell securities nor participate in any
trading strategy. The services should not be relied upon as a basis for
making investment decisions. They should also not be construed as legal
business tax advice. You should consult with your own attorney, business
advisor, and tax advisor before taking action in order to make an
independent determination regarding suitability and legal business tax
consequences. The Services may occasionally be temporarily unavailable
due to maintenance or other reasons. We assume no responsibility for any
errors, omissions, interruptions, deletions, defects, delays in
operation or transmission, communication line failures, theft or
destruction of user communications. We are not responsible for any
problems or technical malfunctions of telephone networks or lines,
computer online systems, servers or providers, computer equipment,
software or services due to technical problems or internet/traffic
congestion.</p>
<ol start="17" type="1">
<li><p><strong>Limitation of Liability.</strong> UNDER NO CIRCUMSTANCES
WILL WE OR ANY HOUSEWELL ENTITY BE LIABLE OR RESPONSIBLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, CONSEQUENTIAL (INCLUDING DAMAGES FROM LOSS OF
BUSINESS, LOST PROFITS, LITIGATION, OR THE LIKE), SPECIAL, EXEMPLARY,
PUNITIVE, OR OTHER DAMAGES, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
ANY WAY RELATING TO THE SITE, YOUR SITE USE, OR THE CONTENT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOUR SOLE REMEDY FOR
DISSATISFACTION WITH THE SITE AND/OR CONTENT IS TO CEASE ALL OF YOUR
SITE USE OR THE RETURN OF ANY FEE PAID TO US BY YOU FOR THE SPECIFIC
SERVICE YOU RECEIVED WITHIN THE FOLLOWING 12 MONTHS AFTER RECEIVING SUCH
SERVICE PLUS $100.</p></li>
</ol>
<blockquote>
<p>You may have additional rights under certain laws (including consumer
laws) which do not allow the exclusion of implied warranties, or the
exclusion or limitation of certain damages. If these laws apply to you,
the exclusions or limitations in this Agreement that directly conflict
with such laws may not apply to you.</p>
</blockquote>
<ol start="18" type="1">
<li><p><strong>Use of Information.</strong> We reserve the right, and
you authorize us, to use and assign all information regarding site uses
by you and all information provided by you in any manner consistent with
our Privacy Policy.</p></li>
<li><p><strong>Copyrights and Copyright Agent.</strong> If you believe
your work has been copied in a way that constitutes copyright
infringement, or your intellectual property rights have otherwise been
violated, please provide a notice containing all of the following
information to our Copyright Agent:</p>
<ol type="a">
<li><p>An electronic or physical signature of the person authorized to
act on behalf of the owner of the copyright or other intellectual
property interest;</p></li>
<li><p>A description of the copyrighted work that you claim has been
infringed;</p></li>
<li><p>A description of where the material that you claim is infringing
is located on the Site;</p></li>
<li><p>Your address, telephone number, and e-mail address;</p></li>
<li><p>A statement by you that you have a good faith belief that the
disputed use is not authorized by the copyright owner, its agent, or the
law; and</p></li>
<li><p>A statement by you, made under penalty of perjury, that the above
information in your notice is accurate and that you are the copyright
owner or authorized to act on the copyright owner's behalf.</p></li>
</ol></li>
</ol>
<blockquote>
<p>Our Copyright Agent for Notice of claims of copyright infringement on
the Site is Parker Bryant, who can be reached as follows:</p>
<p>By Mail: 580 Marsh Park Drive</p>
<p>By Phone: 6786029511</p>
<p>By E-mail: <a
href="mailto:parker@housewell.com"><u>parker@housewell.com</u></a>
Parker to provide relevant information.</p>
</blockquote>
<ol start="20" type="1">
<li><p><strong>Applicable Law.</strong> You agree that the laws of the
state of Georgia, without regard to conflicts of laws provisions will
govern these Terms and Conditions of Use and any dispute that may arise
between you and us or our affiliates.</p></li>
<li><p><strong>Agreement to Arbitrate. Dispute Resolution; Agreement to
Arbitrate.</strong></p>
<ol type="a">
<li><p><strong>General Approach.</strong> In order to efficiently and
cost-effectively resolve disputes between the parties, unless otherwise
stated in Section 21(b) both parties agree that any dispute arising from
this Agreement will be resolved through binding arbitration. Arbitration
is a less formal process than a court lawsuit, utilizing a neutral
arbitrator instead of a judge or jury. It may involve more limited
discovery compared to court proceedings and is subject to minimal review
by courts. Arbitrators have the authority to grant the same damages and
relief as a court can provide. By entering into these terms and
conditions, you acknowledge and accept that we both are waiving the
right to a trial by jury or participation in class actions.</p></li>
<li><p><strong>Exceptions.</strong> Notwithstanding the provisions of
Section 21(a), nothing in this Agreement shall be interpreted as
waiving, excluding, or limiting either party's right: (i) to file an
individual action in small claims court; (ii) to pursue enforcement
actions through applicable federal, state, or local agencies if
available; (iii) to seek injunctive relief from a court of law in
support of arbitration; or (iv) for filing suit in a court of law
regarding an intellectual property infringement claim.</p></li>
<li><p><strong>Opt-Out Option</strong>. If you do not wish to resolve
disputes through binding arbitration, you have the option within 30 days
to opt out of Section 21 by sending a letter stating your full legal
name, email address associated with your Account, along with an explicit
statement expressing your desire for arbitration opt-out ("Opt-Out
Notice") addressed to Housewell Technologies Inc., Attention: Compliance
– Arbitration Opt-Out, 580 Marsh Park Drive, Duluth, GA
30097<strong>.</strong></p></li>
</ol></li>
</ol>
<blockquote>
<p>Upon receipt of your Opt-Out Notice Section 21 (and Section 21 only)
will become voided. Your Opt-Out Notice will not affect the remaining
provisions of these Terms.</p>
</blockquote>
<ol start="4" type="a">
<li><p><strong>Arbitrator.</strong> Any arbitration will be conducted in
accordance with the Federal Arbitration Act and administered by the
American Arbitration Association ("AAA") under its Consumer Arbitration
Rules (collectively referred to as "AAA Rules"), with modifications
specified in these Terms. The AAA Rules and filing forms can be accessed
online at www.adr.org or by calling +1-800-778-7879 for AAA assistance.
The arbitrator holds exclusive authority to resolve any disputes related
to the interpretation, applicability, or enforceability of this binding
arbitration agreement.</p></li>
</ol>
<ol start="22" type="1">
<li><p><strong>No Third-Party Beneficiaries.</strong> There are no
third-party beneficiaries of this agreement.</p></li>
<li><p><strong>Severability.</strong> If any provision of this Agreement
shall be adjudged by any court of competent jurisdiction to be
unenforceable or invalid, that provision shall be limited or eliminated
to the minimum extent necessary so that this Agreement will otherwise
remain in full force and effect.</p></li>
<li><p><strong>Waiver.</strong> Our failure to exercise or enforce any
right or provision of this Agreement shall not operate as a waiver of
such right or provision. Any waiver of this Agreement by us must be in
writing and signed by our authorized representative,</p></li>
<li><p><strong>Notice to California Residents.</strong> Under California
Civil Code Section 1789.3, California users of an electronic commercial
service receive the following consumer rights notice: You may contact
the Complaint Assistance Unit of the Division of Consumer Services of
the California Department of Consumer Affairs in writing at 1625 N.
Market Blvd., Suite S-202, Sacramento, California 95834, or by telephone
at +1-800-952-5210 in order to resolve a complaint regarding the Service
or to receive further information regarding use of the Service.</p></li>
<li><p><strong>Termination.</strong> We may terminate this Agreement at
any time, with or without notice, for any reason.</p></li>
<li><p><strong>Relationship of the Parties.</strong> Nothing contained
in this Agreement or your use of the Site shall be construed to
constitute either party as a partner, joint venturer, employee or agent
of the other party, nor shall either party hold itself out as such.
Neither party has any right or authority to incur, assume or create, in
writing or otherwise, any warranty, liability or other obligation of any
kind, express or implied, in the name of or on behalf of the other
party, it being intended by both parties that each shall remain
independent contractors responsible for its own actions.</p></li>
<li><p><strong>Entire Agreement.</strong> This Terms of Use constitutes
our entire agreement with you and governs the terms and conditions of
your use of the Site, and supersedes all prior or contemporaneous
communications and proposals, whether electronic, oral or written,
between you and us with respect to this Site. Notwithstanding the
foregoing, you may also be subject to additional terms and conditions,
posted policies (including but not limited to the Privacy Policy),
guidelines, or rules that may apply when you use the website. We may
revise this Terms of Use at any time by updating this Agreement and
posting it on the Site. Accordingly, you should visit the Site and
review the Terms of Use periodically to determine if any changes have
been made. Your continued use of this website after any changes have
been made to the Terms of Use signifies and confirms your acceptance of
any such changes or amendments to the Terms of Use.</p></li>
<li><p><strong>Contact Information.</strong></p></li>
</ol>
<blockquote>
<p>Parker Bryant</p>
<p>580 Marsh Park Drive Duluth, Georgia, 30097</p>
<p>678-602-9511</p>
<p>parker@housewell.com</p>
</blockquote>
</body>
</html>
`;


const RawTOUHTMLComponent = () => {
    return <div dangerouslySetInnerHTML={{ __html: rawhtml }} />
  };
  
export default RawTOUHTMLComponent;