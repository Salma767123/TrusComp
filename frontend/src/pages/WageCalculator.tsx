import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calculator as CalcIcon, TrendingUp, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useSEO } from "@/hooks/useSEO";

const WageCalculator = () => {
  useSEO("wage_calculator");
  // Earnings inputs
  const [monthlyGross, setMonthlyGross] = useState<number>(50000);
  const [basicSalary, setBasicSalary] = useState<number>(25000);
  const [da, setDa] = useState<number>(5000);
  const [bonus, setBonus] = useState<number>(2083);
  const [hra, setHra] = useState<number>(10000);
  const [overtime, setOvertime] = useState<number>(0);
  const [commission, setCommission] = useState<number>(0);

  // Exclusions
  const [accommodation, setAccommodation] = useState<number>(0);
  const [employerPf, setEmployerPf] = useState<number>(0);
  const [conveyance, setConveyance] = useState<number>(1600);
  const [specialExpenses, setSpecialExpenses] = useState<number>(0);

  // Calculations
  const calculations = useMemo(() => {
    const pfWage = basicSalary + da;
    const pfEmployee = Math.min(pfWage, 15000) * 0.12;
    const pfEmployer = Math.min(pfWage, 15000) * 0.12;
    const eps = Math.min(pfWage, 15000) * 0.0833;
    const edli = Math.min(pfWage, 15000) * 0.005;
    const adminCharges = Math.min(pfWage, 15000) * 0.005;

    const esicWage = monthlyGross <= 21000 ? monthlyGross : 0;
    const esicEmployee = esicWage * 0.0075;
    const esicEmployer = esicWage * 0.0325;

    const gratuityMonthly = (basicSalary + da) * 15 / 26 / 12;

    const bonusWage = Math.min(basicSalary + da, 7000);
    const statutoryBonus = bonusWage * 0.0833;

    const minimumWage = 21000; // Example minimum wage
    const isCompliant = (basicSalary + da) >= minimumWage;

    return {
      pf: {
        wage: pfWage,
        employee: Math.round(pfEmployee),
        employer: Math.round(pfEmployer),
        eps: Math.round(eps),
        edli: Math.round(edli),
        admin: Math.round(adminCharges),
        total: Math.round(pfEmployee + pfEmployer + eps + edli + adminCharges),
      },
      esic: {
        wage: esicWage,
        employee: Math.round(esicEmployee),
        employer: Math.round(esicEmployer),
        total: Math.round(esicEmployee + esicEmployer),
        applicable: monthlyGross <= 21000,
      },
      gratuity: {
        monthly: Math.round(gratuityMonthly),
        yearly: Math.round(gratuityMonthly * 12),
      },
      bonus: {
        wage: bonusWage,
        monthly: Math.round(statutoryBonus),
        yearly: Math.round(statutoryBonus * 12),
      },
      minimumWage: {
        required: minimumWage,
        actual: basicSalary + da,
        isCompliant,
      },
    };
  }, [monthlyGross, basicSalary, da, bonus, hra, overtime, commission, accommodation, employerPf, conveyance, specialExpenses]);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <CalcIcon className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Wage Impact <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Calculate PF, ESIC, Gratuity, Bonus, and Minimum Wages impact in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="dashboard-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InputField
                    label="Monthly Gross Wages"
                    value={monthlyGross}
                    onChange={setMonthlyGross}
                    tooltip="Total monthly salary including all components"
                  />
                  <InputField
                    label="Basic Salary"
                    value={basicSalary}
                    onChange={setBasicSalary}
                    tooltip="Basic component of salary"
                  />
                  <InputField
                    label="Dearness Allowance (DA)"
                    value={da}
                    onChange={setDa}
                    tooltip="Allowance to offset inflation"
                  />
                  <InputField
                    label="Bonus"
                    value={bonus}
                    onChange={setBonus}
                    tooltip="Monthly bonus component"
                  />
                  <InputField
                    label="HRA"
                    value={hra}
                    onChange={setHra}
                    tooltip="House Rent Allowance"
                  />
                  <InputField
                    label="Overtime"
                    value={overtime}
                    onChange={setOvertime}
                    tooltip="Overtime wages"
                  />
                  <InputField
                    label="Commission"
                    value={commission}
                    onChange={setCommission}
                    tooltip="Sales or performance commission"
                  />
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    Exclusions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InputField
                    label="Accommodation Value"
                    value={accommodation}
                    onChange={setAccommodation}
                    tooltip="Value of accommodation provided"
                  />
                  <InputField
                    label="Employer PF Contribution"
                    value={employerPf}
                    onChange={setEmployerPf}
                    tooltip="Employer's PF contribution"
                  />
                  <InputField
                    label="Conveyance Allowance"
                    value={conveyance}
                    onChange={setConveyance}
                    tooltip="Travel allowance"
                  />
                  <InputField
                    label="Special Expenses"
                    value={specialExpenses}
                    onChange={setSpecialExpenses}
                    tooltip="Other special expense allowances"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="pf" className="w-full">
                <TabsList className="w-full grid grid-cols-5 h-auto p-1 bg-secondary">
                  <TabsTrigger value="pf" className="text-xs sm:text-sm py-2">PF</TabsTrigger>
                  <TabsTrigger value="esic" className="text-xs sm:text-sm py-2">ESIC</TabsTrigger>
                  <TabsTrigger value="gratuity" className="text-xs sm:text-sm py-2">Gratuity</TabsTrigger>
                  <TabsTrigger value="bonus" className="text-xs sm:text-sm py-2">Bonus</TabsTrigger>
                  <TabsTrigger value="minwage" className="text-xs sm:text-sm py-2">Min Wage</TabsTrigger>
                </TabsList>

                <TabsContent value="pf" className="mt-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-display">Provident Fund Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ResultCard label="PF Wage" value={calculations.pf.wage} highlight />
                        <ResultCard label="Employee PF (12%)" value={calculations.pf.employee} />
                        <ResultCard label="Employer PF (12%)" value={calculations.pf.employer} />
                        <ResultCard label="EPS (8.33%)" value={calculations.pf.eps} />
                        <ResultCard label="EDLI (0.5%)" value={calculations.pf.edli} />
                        <ResultCard label="Admin Charges (0.5%)" value={calculations.pf.admin} />
                      </div>
                      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground">Total Monthly PF Cost</span>
                          <span className="text-2xl font-bold text-primary">₹{calculations.pf.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="esic" className="mt-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-display">ESIC Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {calculations.esic.applicable ? (
                        <>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <ResultCard label="ESIC Wage" value={calculations.esic.wage} highlight />
                            <ResultCard label="Employee (0.75%)" value={calculations.esic.employee} />
                            <ResultCard label="Employer (3.25%)" value={calculations.esic.employer} />
                          </div>
                          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-foreground">Total Monthly ESIC</span>
                              <span className="text-2xl font-bold text-accent">₹{calculations.esic.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-6 text-center bg-secondary rounded-lg">
                          <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">
                            ESIC not applicable. Gross wages exceed ₹21,000 threshold.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gratuity" className="mt-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-display">Gratuity Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ResultCard label="Monthly Provision" value={calculations.gratuity.monthly} />
                        <ResultCard label="Yearly Provision" value={calculations.gratuity.yearly} highlight />
                      </div>
                      <div className="mt-6 p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <Info className="w-4 h-4 inline mr-1" />
                          Gratuity = (Basic + DA) × 15/26 days per year of service. Payable after 5 years.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bonus" className="mt-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-display">Statutory Bonus Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ResultCard label="Bonus Wage (capped ₹7000)" value={calculations.bonus.wage} />
                        <ResultCard label="Monthly (8.33%)" value={calculations.bonus.monthly} />
                        <ResultCard label="Yearly Bonus" value={calculations.bonus.yearly} highlight />
                      </div>
                      <div className="mt-6 p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <Info className="w-4 h-4 inline mr-1" />
                          Statutory bonus is 8.33% to 20% of basic wage, with ₹7,000 monthly ceiling.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="minwage" className="mt-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-display">Minimum Wages Compliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ResultCard label="Minimum Required" value={calculations.minimumWage.required} />
                        <ResultCard label="Actual (Basic + DA)" value={calculations.minimumWage.actual} />
                      </div>
                      <div className={`mt-6 p-4 rounded-lg ${calculations.minimumWage.isCompliant ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        <div className="flex items-center gap-2">
                          {calculations.minimumWage.isCompliant ? (
                            <>
                              <div className="w-3 h-3 rounded-full bg-success" />
                              <span className="font-semibold text-success">Compliant with Minimum Wages</span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 rounded-full bg-destructive" />
                              <span className="font-semibold text-destructive">Below Minimum Wage - Action Required</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Helper Components
interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip: string;
}

const InputField = ({ label, value, onChange, tooltip }: InputFieldProps) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      <Label className="text-sm text-foreground">{label}</Label>
      <Tooltip>
        <TooltipTrigger>
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="pl-7"
      />
    </div>
  </div>
);

interface ResultCardProps {
  label: string;
  value: number;
  highlight?: boolean;
}

const ResultCard = ({ label, value, highlight }: ResultCardProps) => (
  <div className={`p-4 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-secondary'}`}>
    <div className="text-sm text-muted-foreground mb-1">{label}</div>
    <div className={`text-xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
      ₹{value.toLocaleString()}
    </div>
  </div>
);

export default WageCalculator;
