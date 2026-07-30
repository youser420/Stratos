import "server-only";

import { NextResponse } from "next/server";

import { AppError, isAppError, toAppError } from "@/server/errors";
import { logger } from "@/server/logger";
import type { ApiFailure, ApiResponse, ApiSuccess } from "@/types/api";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(
    { success: true, data } satisfies ApiSuccess<T>,
    init,
  );
}

export function fail(error: AppError, init?: ResponseInit) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    } satisfies ApiFailure,
    { status: error.statusCode, ...init },
  );
}

export function handleRouteError(error: unknown, init?: ResponseInit) {
  const appError = isAppError(error) ? error : toAppError(error);

  if (!isAppError(error)) {
    logger.error("Unhandled route error", { error });
  }

  return fail(appError, init);
}

export type { ApiFailure, ApiResponse, ApiSuccess };
