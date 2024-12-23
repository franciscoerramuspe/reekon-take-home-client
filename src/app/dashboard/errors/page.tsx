'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BarChart3, List } from "lucide-react";

export default function ErrorsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Error Management</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/dashboard/errors/analytics">
          <Card className="hover:border-blue-600 transition-colors cursor-pointer bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Error Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">View detailed error statistics and trends</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/errors/log">
          <Card className="hover:border-blue-600 transition-colors cursor-pointer bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Error Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Browse and filter detailed error logs</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
} 