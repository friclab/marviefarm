import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Table, Eye, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const navigate = useNavigate();
  const [multiplier, setMultiplier] = useState('1');
  const [detailed, setDetailed] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  async function downloadCsv() {
    setCsvLoading(true);
    try {
      const mult = Number(multiplier) || 1;
      const res = await api.get('/reports/cost-calculation', {
        params: { multiplier: mult, detailed },
        responseType: 'blob',
      });
      downloadBlob(res.data as Blob, `costX${mult}.csv`);
    } catch {
      alert('Errore nel download CSV');
    } finally {
      setCsvLoading(false);
    }
  }

  async function downloadArticlesPdf() {
    setArticlesLoading(true);
    try {
      const res = await api.get('/reports/articles-list', { responseType: 'blob' });
      downloadBlob(res.data as Blob, 'lista_articoli.pdf');
    } catch {
      alert('Errore nella generazione PDF (Puppeteer/Chrome richiesto)');
    } finally {
      setArticlesLoading(false);
    }
  }

  async function downloadOrderForm() {
    setFormLoading(true);
    try {
      const res = await api.get('/reports/orders/form', { responseType: 'blob' });
      downloadBlob(res.data as Blob, 'modulo_ordine.pdf');
    } catch {
      alert('Errore nella generazione PDF (Puppeteer/Chrome richiesto)');
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Report</h1>

      <div className="space-y-4">
        {/* Cost calculation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Table className="w-4 h-4" /> Calcolo Costo Produzione
            </CardTitle>
            <CardDescription>
              Costo per articolo/variante (somma dei materiali × moltiplicatore).
              Spunta «Dettaglio materiali» per il report esteso con la distinta dei materiali.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-end gap-3">
                <div className="space-y-1 w-32">
                  <Label>Moltiplicatore</Label>
                  <Input type="number" step="0.1" min="0.1" value={multiplier} onChange={e => setMultiplier(e.target.value)} />
                </div>
                <Button onClick={downloadCsv} disabled={csvLoading} variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  {csvLoading ? 'Download...' : 'Scarica CSV'}
                </Button>
                <Button onClick={() => navigate('/reports/cost-preview')} variant="secondary">
                  <Eye className="w-4 h-4 mr-1" />
                  Visualizza online
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="detailed"
                  checked={detailed}
                  onCheckedChange={v => setDetailed(v === true)}
                />
                <Label htmlFor="detailed" className="font-normal cursor-pointer">
                  Dettaglio materiali
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Material consumption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Boxes className="w-4 h-4" /> Consumo Materiali
            </CardTitle>
            <CardDescription>
              Quantità totale necessaria per ciascun materiale in base agli ordini inseriti.
              Filtrabile per singolo ordine.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/reports/material-consumption')} variant="secondary">
              <Eye className="w-4 h-4 mr-1" />
              Visualizza online
            </Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Articles list PDF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" /> Lista Articoli
            </CardTitle>
            <CardDescription>
              PDF con tutti gli articoli raggruppati per progetto, con tessuti disponibili
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadArticlesPdf} disabled={articlesLoading} variant="outline">
              <Download className="w-4 h-4 mr-1" />
              {articlesLoading ? 'Generazione PDF...' : 'Scarica PDF'}
            </Button>
          </CardContent>
        </Card>

        {/* Order form PDF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" /> Modulo Ordine (vuoto)
            </CardTitle>
            <CardDescription>
              PDF del modulo d'ordine in bianco con tutti gli articoli e le taglie disponibili
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadOrderForm} disabled={formLoading} variant="outline">
              <Download className="w-4 h-4 mr-1" />
              {formLoading ? 'Generazione PDF...' : 'Scarica PDF'}
            </Button>
          </CardContent>
        </Card>

        <Separator />

        <p className="text-xs text-muted-foreground">
          I PDF specifici per ordine (export, griglia taglie) sono accessibili dalla pagina di dettaglio di ogni ordine.
          I report PDF richiedono Puppeteer/Chrome installato sul server.
        </p>
      </div>
    </div>
  );
}
