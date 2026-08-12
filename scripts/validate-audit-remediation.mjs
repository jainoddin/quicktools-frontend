import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const checkout = read('app/checkout/processing/page.tsx');
assert(!checkout.includes('Math.random'), 'Checkout processing must never use random payment outcomes.');
assert(checkout.includes('/api/payment/status/'), 'Checkout processing must read authenticated backend payment status.');

const layout = read('app/layout.tsx');
assert(!layout.includes("'/en-US'"), 'Root metadata must not advertise a missing /en-US route.');
assert(!layout.includes('keywords:'), 'Root meta keywords should remain removed.');

const homepage = read('app/page.tsx');
assert(!homepage.includes('price: \'0\''), 'Homepage schema must not describe the whole product as zero-price.');
assert(!homepage.includes('SoftwareApplication'), 'Homepage must not publish incomplete SoftwareApplication rich-result markup.');

const promptGenerator = read('app/prompts/generator/page.tsx');
assert(promptGenerator.includes("'WebPage'"), 'Prompt generator must use honest WebPage schema.');
assert(!promptGenerator.includes("'WebApplication'"), 'Prompt generator must not publish incomplete WebApplication markup.');

const learnPage = read('app/learn/page.tsx');
assert(!learnPage.includes('"@type": "Course"'), 'Learn hub must not publish incomplete Course rich-result markup.');

const toolsPage = read('app/tools/page.tsx');
const toolsClient = read('components/tools/ToolsClient.tsx');
assert(!toolsPage.includes('110+'), 'Tools metadata must derive the exact registry count instead of advertising 110+.');
assert(toolsPage.includes('allTools.length'), 'Tools metadata/schema must derive its count from the canonical registry.');
assert(toolsClient.includes('Explore {allTools.length} AI Tools'), 'Tools directory heading must derive its count from the canonical registry.');
assert(!toolsClient.includes('unlimited access'), 'Tools upgrade messaging must not promise unlimited access on credit-based plans.');

const promptModelSelector = read('components/prompts/PromptModelSelector.tsx');
const promptModelsPage = read('app/prompts/models/page.tsx');
assert(promptModelSelector.includes('compatible prompts'), 'Prompt model counts must be labelled as overlapping compatible prompts.');
assert(promptModelsPage.includes('compatible prompts'), 'Prompt models page must label overlapping model counts clearly.');

const pricing = read('components/pricing/PricingClient.tsx');
const dashboardPlans = read('app/dashboard/billing/plans/page.tsx');
const pricingSchema = read('app/pricing/page.tsx');
const paymentPlans = read('../backend/src/config/paymentPlans.ts');
for (const [plan, rupees, paise] of [
  ['starter', '299', '29_900'],
  ['pro', '3588', '358_800'],
  ['business', '6000', '600_000'],
]) {
  assert(pricing.includes(`id: '${plan}'`) && pricing.includes(`price: ${rupees}`), `Public pricing must retain the canonical ${plan} price.`);
  assert(dashboardPlans.includes(`id: '${plan}'`) && dashboardPlans.includes(`price: ${rupees}`), `Dashboard pricing must match the canonical ${plan} price.`);
  assert(paymentPlans.includes(`${plan}: { amountPaise: ${paise}`), `Backend payment registry must match the canonical ${plan} price.`);
  assert(pricingSchema.includes(`"price": "${rupees}"`), `Pricing schema must match the canonical ${plan} price.`);
}
assert(!pricing.includes("starter: '100 / month'"), 'Pricing comparison must not show the stale Starter access limit.');
assert(!dashboardPlans.includes('${plan.originalPrice}/month') && !dashboardPlans.includes('${plan.yearlyPrice} yearly'), 'Dashboard plans must not mix legacy USD labels with INR checkout prices.');

const config = read('next.config.ts');
const productionCsp = config.split('const developmentCsp')[0];
assert(!productionCsp.includes("'unsafe-eval'"), 'Production CSP must not contain unsafe-eval.');

for (const file of [
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/home/HomeSearch.tsx',
  'components/navigator/QuickToolsNavigator.tsx',
  'components/shared/NewsletterForm.tsx',
]) {
  assert(!read(file).includes('suppressHydrationWarning'), `${file} must not hide hydration mismatches.`);
}

if (failures.length) {
  console.error(`Audit remediation validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Audit remediation validation passed.');
